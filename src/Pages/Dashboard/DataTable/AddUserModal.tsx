import React, {useState, useEffect, Fragment} from 'react';
import {useQuery} from 'react-query';
import {db} from '../../../Config/Firebase-config';
import {doc, setDoc} from 'firebase/firestore';
import {nanoid} from 'nanoid';
import {Dialog, Transition} from '@headlessui/react';
import {AddIcon} from '../../../Components/Icons';

interface newUserDataType {
  photoUrl: string;
  name: string;
  email: string;
  role: string;
}

const AddUserModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newUserData, setNewUserData] = useState<newUserDataType>({
    photoUrl: '',
    name: '',
    email: '',
    role: 'Admin',
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserData({...newUserData, [e.target.name]: e.target.value});
  };

  const handleAddNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newUserData.name || !newUserData.email) {
      alert('Values cannot be empty!');
      return;
    }

    const id = nanoid();

    const databaseRef = doc(db, 'techwondoe-intern-assignment-users', id);

    const new_user_data = {
      ...newUserData,
      id,
      status: 'Active',
      lastOnlineDate: new Date().toLocaleDateString(),
      lastOnlineTime: new Date().toLocaleTimeString(),
    };

    try {
      await setDoc(databaseRef, new_user_data);
      alert('User registered');
    } catch (e) {
      console.log(e);
      alert('Error Occurred!');
    }
  };

  const {isFetching, data, refetch} = useQuery(
    'new-user-data',
    async () => {
      const res = await fetch(
        'https://randomuser.me/api/?inc=name,email,picture&?nat=US'
      );
      const json = await res.json();
      return json.results[0];
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (isFetching || !data) return;
    setNewUserData({
      ...newUserData,
      name: `${data.name.first} ${data.name.last}`,
      email: data.email,
      photoUrl: data.picture.large,
    });
  }, [data, isFetching]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-md py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 border border-blue-700 cursor-pointer flex items-center"
      >
        <AddIcon /> Add User
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit user
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={e => handleAddNewUser(e)}>
                      <img
                        src={newUserData.photoUrl}
                        alt="Profile Photo"
                        className="mx-auto rounded-full mt-5 w-[100px] h-[100px] drop-shadow-md"
                      />
                      <label htmlFor="name" className="py-2 block w-full">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newUserData.name}
                        onChange={e => handleChange(e)}
                        autoFocus
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      />
                      <label htmlFor="email" className="py-2 block w-full">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newUserData.email}
                        onChange={e => handleChange(e)}
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      />
                      <label htmlFor="rolw" className="py-2 block w-full">
                        Choose a role:
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={newUserData.role}
                        onChange={e =>
                          setNewUserData({...newUserData, role: e.target.value})
                        }
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Sales Leader">Sales Leader</option>
                        <option value="Sales Rep">Sales Rep</option>
                      </select>
                      <input
                        type="submit"
                        value="Register"
                        className="w-full mt-5 rounded-md p-2 bg-green-300 text-green-900 hover:bg-green-400 border border-green-400 cursor-pointer"
                      />
                    </form>
                    <button
                      onClick={() => refetch()}
                      className="w-full mt-3 rounded-md p-2 bg-gray-300 text-gray-900 hover:bg-gray-400 border border-gray-400 cursor-pointer"
                    >
                      {isFetching ? (
                        'Loading...'
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2 inline"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                          Random generate
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-row-reverse gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddUserModal;
