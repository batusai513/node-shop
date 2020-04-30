import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import merge from 'deepmerge';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { formatMoney } from '../utils/format';
import useConstant from '../utils/useConstant';

const GET_ITEM = gql`
  query GET_ITEM($id: ID!) {
    getItem(id: $id) {
      id
      title
      description
      image
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Float
  ) {
    updateItem(
      id: $id
      input: {
        title: $title
        description: $description
        image: $image
        largeImage: $largeImage
        price: $price
      }
    ) {
      id
    }
  }
`;

export default function UpdateItem() {
  const router = useRouter();
  const { query } = router;

  const defaults = useConstant(() => ({
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
    tempImage: {
      value: '',
      files: [],
    },
  }));

  const {
    data: itemData,
    loading: getItemLoading,
    error: getItemError,
  } = useQuery(GET_ITEM, { variables: { id: query.id } });

  const [state, setState] = React.useState(() =>
    merge(defaults, itemData?.getItem ?? {})
  );
  const [uploading, setUploading] = React.useState(false);

  const [updateItem, { data, loading, error }] = useMutation(
    UPDATE_ITEM_MUTATION,
    {
      refetchQueries: [{ query: GET_ITEM, variables: { id: query.id } }],
    }
  );

  React.useEffect(
    function itemQueryEffect() {
      if (itemData?.getItem) {
        setState((state) => merge(state, itemData?.getItem ?? {}));
      }
    },
    [itemData?.getItem]
  );

  if (getItemLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Form onSubmit={onSubmitHandler}>
      <h2>Sell an Item</h2>
      <ErrorMessage error={error} />
      <fieldset
        disabled={loading || uploading}
        aria-busy={loading || uploading}>
        <label htmlFor="tempImage">Image</label>
        <input
          type="file"
          id="tempImage"
          name="tempImage"
          placeholder="Upload an image"
          value={state.tempImage.value}
          onChange={handleChange}
        />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="title"
          value={state.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={state.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Enter a Description"
          value={state.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Update item</button>
      </fieldset>
    </Form>
  );

  function handleChange(e) {
    const { value, name, type, files } = e.target;
    var valueToUse = value;
    if (type == 'file') {
      valueToUse = { value: value, files: files };
    } else if (type == 'number') {
      valueToUse = parseFloat(value);
    }
    setState((s) => ({ ...s, [name]: valueToUse }));
  }

  function uploadFile(image) {
    const toUpload = image[0];
    if (!toUpload) {
      return Promise.resolve(null);
    }
    const data = new FormData();
    data.append('file', toUpload);
    data.append('upload_preset', 'sickfits');
    return fetch('https://api.cloudinary.com/v1_1/rroncancio/image/upload/', {
      method: 'POST',
      body: data,
    }).then((res) => res.json());
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const { tempImage, ...usableState } = state;
    setUploading(true);
    uploadFile(state.tempImage.files).then((file) => {
      const images =
        file != null
          ? { image: file.secure_url, largeImage: file.eager[0]?.secure_url }
          : {};
      return updateItem({
        variables: {
          id: itemData.getItem.id,
          ...usableState,
          ...images,
        },
      }).then(
        (res) => {
          setUploading(false);
          setState(defaults);
          router.push('/item/[id]', `/item/${res.data.updateItem.id}`);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
