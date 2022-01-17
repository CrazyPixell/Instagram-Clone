import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { db, storage } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
import { useSession } from 'next-auth/react';

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log('New document added with ID', docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async snapshot => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = e => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = readerEvent => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-50 inset-0 overflow-y-auto'
        onClose={setOpen}
      >
        <div className='flex item-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'>
              <div>
                {selectedFile ? (
                  <img
                    className='w-full object-contain cursor-pointer'
                    src={selectedFile}
                    alt='user image'
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <div
                    className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon
                      className='h-6 w-6 text-red-500'
                      aria-hidden='true'
                    />
                  </div>
                )}
                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='p'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Загрузить фото
                    </Dialog.Title>
                    <div>
                      <input
                        type='file'
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>

                    <div className='mt-2'>
                      <input
                        type='text'
                        className='border-none focus:ring-0 w-full text-center'
                        placeholder='Придумайте подпись'
                        ref={captionRef}
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={!selectedFile}
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                    onClick={uploadPost}
                  >
                    {loading ? 'Публикую...' : 'Опубликовать'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
