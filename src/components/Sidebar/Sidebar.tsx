import { useState } from "react";
import { GoLightBulb } from "react-icons/go";
import { MdNotificationsNone } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import '../../styles/Sidebar.css';
import { SidebarProps } from "../../interfaces/types";

const Sidebar: React.FC<SidebarProps> = ({ handleChangeSelection }) => {
  const [currentLabel, setCurrentLabel] = useState('Notes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const data = [
    {
      title: 'Notes',
      icon: <GoLightBulb />,
    },
    {
      title: 'Reminders',
      icon: <MdNotificationsNone />,
    },
    {
      title: 'Edit Label',
      icon: <MdModeEdit />,
    },
    {
      title: 'Archive',
      icon: <IoArchiveOutline />,
    },
    {
      title: 'Trash',
      icon: <FaRegTrashAlt />,
    },
  ];

  const handleOptionClick = (title:string) => {
    setCurrentLabel(title);
    handleChangeSelection(title);
  };

  return (
    <>
     <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</div>
      <div className={`menu ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}>
        {data.map((label) => (
          <div
            key={label.title}
            onClick={() => handleOptionClick(label.title)}
            className={`menu-drawer-option ${currentLabel === label.title ? 'selected-option' : ''}`}
          >
            <div className="menu-icon">{label.icon}</div>
            <div className="menu-title">{label.title}</div>
          </div>
        ))}
      </div>
      <div className="sidebar">
        {data.map((label) => (
          <div
            key={label.title}
            onClick={() => handleOptionClick(label.title)}
            className={`sidebar-option ${currentLabel === label.title ? 'selected-option' : ''}`}
          >
            <div className="sidebar-icon">{label.icon}</div>
            <div className="sidebar-title">{label.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
