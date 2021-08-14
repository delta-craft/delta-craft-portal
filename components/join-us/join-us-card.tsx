import { Paper } from "@material-ui/core";
import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  desc: string;
  icon?: JSX.Element;
  link?: string;
}

const JoinUsCard: React.FC<IProps> = ({ title, desc, icon, link = "" }) => {
  return (
    <Link href={link} passHref>
      <a target="_blank" rel="noopener">
        <Paper style={{ minHeight: 150 }}>
          <div className="card-body hover-shadow d-flex flex-column align-items-center">
            <div className="display-5 text-white">{icon}</div>
            <h4 className="card-title text-white">{title}</h4>
            <p className="card-text text-white">{desc}</p>
          </div>
        </Paper>
      </a>
    </Link>
  );
};

export default JoinUsCard; 