import React from "react";
import { Avatar, Typography, Tooltip } from "@mui/material";

interface Author {
  fullName: string;
  githubHandle: string;
  avatar: string;
}

const AUTHORS: Author[] = [
  {
    fullName: "Boris Kachanov",
    githubHandle: "kachanov",
    avatar: "https://avatars.githubusercontent.com/u/11651859?v=4",
  },
  {
    fullName: "Egor Lomagin",
    githubHandle: "informhunter",
    avatar: "https://avatars.githubusercontent.com/u/1675288?v=4",
  },
  {
    fullName: "Aleksandr Lukoianov",
    githubHandle: "LiableFish",
    avatar: "https://avatars.githubusercontent.com/u/49318785?v=4",
  },
];

const Authors: React.FC = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h5">Pepsikolniy team</Typography>
      {AUTHORS.map((member) => {
        return (
          <Tooltip
            arrow
            key={member.githubHandle}
            title={<Typography>{member.fullName}</Typography>}
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  borderRadius: "4px",
                  bgcolor: "gray",
                  "& .MuiTooltip-arrow": {
                    color: "gray",
                  },
                },
              },
            }}
          >
            <Avatar
              sx={{ width: 56, height: 56, marginRight: "8px" }}
              alt={member.githubHandle}
              src={member.avatar}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export { Authors };
