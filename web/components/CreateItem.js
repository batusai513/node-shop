import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { formatMoney } from '../utils/format';
import useConstant from '../utils/useConstant';
import CREATE_ITEM_MUTATION from '../graphql/item/createItem.graphql';
import ALL_ITEMS_QUERY from '../graphql/item/getItems.graphql';

export default function CreateItem() {
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

  const [state, setState] = React.useState(defaults);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    variables: state,
    refetchQueries: [{ query: ALL_ITEMS_QUERY }],
  });

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
    const data = new FormData();
    data.append('file', image[0]);
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
      return createItem({
        variables: {
          ...usableState,
          image: file.secure_url,
          largeImage: file.eager[0]?.secure_url,
        },
      }).then(
        (res) => {
          setUploading(false);
          setState(defaults);
          router.push('/item/[id]', `/item/${res.data.createItem.id}`);
        },
        (err) => {
          console.log(err);
        }
      );
    });
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
          required
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

        <button type="submit">Create item</button>
      </fieldset>
    </Form>
  );
}
