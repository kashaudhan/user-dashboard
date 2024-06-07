import React from "react";

interface UserProps {
  name: string;
  username: string;
  avatarSrc: string;
}

const users = [
  { name: 'Olivia Rhye', username: 'olivia', avatarSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e86244f6c2383583656d93479ca11b75ec85a17667c490284493d52e8419636f?apiKey=d1982213c0344b17af133010773a2a3d&' },
  { name: 'Olivia Rhye', username: 'olivia', avatarSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e86244f6c2383583656d93479ca11b75ec85a17667c490284493d52e8419636f?apiKey=d1982213c0344b17af133010773a2a3d&' }
];

const UserCard: React.FC<UserProps> = ({ name, username, avatarSrc }) => {

  return (
    <article className="flex gap-3 px-6 py-4 text-sm leading-5 border-b border-gray-200 border-solid max-md:px-5">
      <div className="shrink-0 my-auto w-5 h-5 bg-white rounded-md border border-gray-300 border-solid" />
      <img src={avatarSrc} alt={`${name}'s avatar`} className="shrink-0 w-10 aspect-square" />
      <div className="flex flex-col">
        <div className="font-medium text-gray-900">{name}</div>
        <div className="text-gray-500">@{username}</div>
      </div>
      <StatusBadge status="Active" />
      <Role />
      <Email email="abs@gmail.com" />
      <Badges />
    </article>
  );
}

const UserList: React.FC = () => {

  return (
    <section>
      {users.map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          username={user.username}
          avatarSrc={user.avatarSrc}
        />
      ))}
    </section>
  );
};

export default UserList;


type StatusBadgeProps = {
  status: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <div className="flex gap-1.5 justify-center px-1.5 py-0.5 bg-emerald-50 rounded-2xl">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5c9869ccae0c46b53b81f292b0cbb76275a9f72826f3b6e1ead9d541cded3bf?apiKey=d1982213c0344b17af133010773a2a3d&"
      className="shrink-0 my-auto w-2 aspect-square"
      alt=""
    />
    <span>{status}</span>
  </div>
);

const Role = () => {
  return (
    <section className="justify-center items-start px-6 py-4 border-b border-gray-200 border-solid max-md:px-5"> 
      <h1>Product Designer</h1> 
    </section>
  );
}

type MyComponentProps = {
  email: string;
};

const Email: React.FC<MyComponentProps> = ({ email }) => {
  return (
    <section className="justify-center items-start px-6 py-4 whitespace-nowrap border-b border-gray-200 border-solid max-md:px-5">
      {email}
    </section>
  );
};


type BadgeProps = {
  text: string;
  bgColor: string;
  textColor: string;
};

const Badge: React.FC<BadgeProps> = ({ text, bgColor, textColor }) => {
  return (
    <span
      className={`justify-center px-2 py-0.5 ${bgColor} ${textColor} rounded-2xl`}
    >
      {text}
    </span>
  );
};

function Badges() {
  const badges = [
    { text: "Design", bgColor: "bg-purple-50", textColor: "text-violet-700" },
    { text: "Product", bgColor: "bg-sky-50", textColor: "text-blue-700" },
    { text: "Marketing", bgColor: "bg-indigo-50", textColor: "text-indigo-700" },
    { text: "+4", bgColor: "bg-gray-100", textColor: "text-slate-700" }
  ];

  return (
    <section className="flex flex-col justify-center px-6 py-4 text-center border-b border-gray-200 border-solid max-md:px-5">
      <div className="flex gap-1">
        {badges.map((badge, index) => (
          <Badge key={index} text={badge.text} bgColor={badge.bgColor} textColor={badge.textColor} />
        ))}
      </div>
    </section>
  );
}