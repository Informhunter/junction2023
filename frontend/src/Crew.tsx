import React from "react";

const MEMBERS = [
  { handle: 'kachanov', avatar: 'https://avatars.githubusercontent.com/u/11651859?v=4' },
  { handle: 'informhunter', avatar: 'https://avatars.githubusercontent.com/u/1675288?v=4' },
  { handle: 'LiableFish', avatar: 'https://avatars.githubusercontent.com/u/49318785?v=4' },
];

function Crew() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h2>Pepsikolniy team</h2>
      {MEMBERS.map(member => {
        return (
          <img
            key={member.handle}
            alt={member.handle}
            style={avatarStyles}
            src={member.avatar}
          />
        )
      })}
    </div>
  );
}

const avatarStyles = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
};

export { Crew };
