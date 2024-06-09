import * as React from 'react';
import { Popup } from "./popup";

interface InfoDisplayProps {
  title: string;
  content: string;
}

interface RoleDisplayProps {
  title: string;
  role: string;
  imgSrc: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ title, content }) => (
  <section className="mt-5">
    <h2 className="text-slate-700 max-md:max-w-full">{title}</h2>
    <p className="justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
      {content}
    </p>
  </section>
);

const RoleDisplay: React.FC<RoleDisplayProps> = ({ title, role, imgSrc }) => (
  <section className="mt-5">
    <h2 className="text-slate-700 max-md:max-w-full">{title}</h2>
    <div className="flex gap-2 justify-between px-3.5 py-2.5 text-base leading-6 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:flex-wrap max-md:max-w-full">
      <div>{role}</div>
      <img loading="lazy" src={imgSrc} alt="User role icon" className="shrink-0 my-auto w-5 aspect-square" />
    </div>
  </section>
);

type EditUser = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const EditUser = ({ isVisible, setIsVisible, user }: EditUser) => {

  const [newUserDetail, setNewUserDetail] = React.useState<User>(user);

  return (
    <Popup show={isVisible} onClose={() => setIsVisible(false)}>
      <form className="flex flex-col p-6 text-sm font-medium leading-5 bg-white rounded-xl shadow-xl max-w-[482px] max-md:px-5">
        <header className="text-lg leading-7 text-gray-900 max-md:max-w-full">Edit User Details</header>
        
        <InfoDisplay title="Name" content="Olivia Rhye" />
        
        <RoleDisplay title="User Role" role="Product Designer" imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/9f288935232c2b601ff5bd7f94908d897dfaab83742491521bc37030849a2b7c?apiKey=d1982213c0344b17af133010773a2a3d&" />
        
        <InfoDisplay title="Email Address" content="olivia@untitledui.com" />
        
        <div className="flex gap-3 mt-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
          <button onClick={(e) => { e.preventDefault(); setIsVisible(false) }} type="button" className="flex-1 justify-center items-center px-4 py-2.5 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-slate-700 max-md:px-5">
            Cancel
          </button>
          <button onClick={(e) => { e.preventDefault(); setIsVisible(false) }} type="submit" className="flex-1 justify-center items-center px-4 py-2.5 text-white bg-violet-500 rounded-lg border border-violet-500 border-solid shadow-sm max-md:px-5">
            Confirm
          </button>
        </div>
      </form>

    </Popup>
  );
};

export default EditUser;