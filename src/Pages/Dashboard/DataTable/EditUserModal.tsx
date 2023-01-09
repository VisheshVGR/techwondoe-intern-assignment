import React, {Fragment, useState, useEffect} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {EditIcon} from '../../../Components/Icons';
import {db} from '../../../Config/Firebase-config';
import {doc, updateDoc} from 'firebase/firestore';

interface DataProps {
  email?: string;
  id?: string;
  lastOnlineDate?: string;
  lastOnlineTime?: string;
  name?: string;
  photoUrl?: string;
  role?: string;
  status?: string;
  DocumentData?: string;
}

const EditUserModal = ({data}: {data: DataProps}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<DataProps>({
    email: '',
    id: '',
    lastOnlineDate: '',
    lastOnlineTime: '',
    name: '',
    photoUrl: '',
    role: '',
    status: '',
  });

  useEffect(() => {
    setUserData({...userData, ...data});
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const handleEditUser = async () => {
    if (!userData.name || !userData.email) {
      alert('Values cannot be empty!');
      return;
    }

    const databaseRef = doc(
      db,
      'techwondoe-intern-assignment-users',
      data.id || ''
    );

    const updated_user_data = {
      ...userData,
      lastOnlineDate: new Date().toLocaleDateString(),
      lastOnlineTime: new Date().toLocaleTimeString(),
    };

    try {
      await updateDoc(databaseRef, updated_user_data);
      alert('User updated');
    } catch (e) {
      console.log(e);
      alert('Error Occurred!');
    }
  };

  return (
    <>
      <span onClick={openModal}>
        <EditIcon />
      </span>

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
                    <form>
                      <img
                        src={userData.photoUrl}
                        alt="Profile Photo"
                        className="mx-auto rounded-full mt-5 w-[100px] h-[100px] drop-shadow-md"
                      />
                      <label htmlFor="name" className="py-2 block w-full">
                        Id:
                      </label>
                      <input
                        type="text"
                        id="id"
                        name="id"
                        value={userData.id}
                        disabled
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      />
                      <label htmlFor="name" className="py-2 block w-full">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
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
                        value={userData.email}
                        onChange={e => handleChange(e)}
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      />
                      <label htmlFor="role" className="py-2 block w-full">
                        Choose a role:
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={userData.role}
                        onChange={e =>
                          setUserData({...userData, role: e.target.value})
                        }
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Sales Leader">Sales Leader</option>
                        <option value="Sales Rep">Sales Rep</option>
                      </select>
                      <label htmlFor="status" className="py-2 block w-full">
                        Change status:
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={userData.status}
                        onChange={e =>
                          setUserData({...userData, status: e.target.value})
                        }
                        className="w-full border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2"
                      >
                        <option value="Active">Active</option>
                        <option value="Invited">Invited</option>
                      </select>
                    </form>
                  </div>

                  <div className="mt-4 flex flex-row-reverse gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={handleEditUser}
                    >
                      Save Changes
                    </button>
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

export default EditUserModal;
