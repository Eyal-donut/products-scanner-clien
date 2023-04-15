import PageHeader from "../../components/PageHeader/PageHeader";
import classes from "./ProfilePage.module.css";
import { useEffect } from "react";
import { useCheckCameraAndRefresh } from "../../hooks/useCheckCameraAndRefresh ";
import { useLoggedUserContext } from "../../context/loggedUserContext";
import DropdownComponent from "../../components/ProfilePageComponents/DropdownComponent/DropdownComponent";
import { useUserSettings } from "../../hooks/useUserSettings";

const ProfilePage = () => {
  const { checkCameraAndRefresh } = useCheckCameraAndRefresh();
  const { createSettingsArray } = useUserSettings();
  const { loggedUser } = useLoggedUserContext();

  const settingsArray = createSettingsArray(loggedUser);

  useEffect(() => {
    checkCameraAndRefresh();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageHeader className={classes.header}>
        <h1 className={classes.h1}>Hello {loggedUser.name}!</h1>
      </PageHeader>
      {settingsArray.map((category) => (
        <DropdownComponent
          key={category.name}
          options={category.value}
          headerText={category.name}
          categoryIcon={category.icon}
        />
      ))}
    </>
  );
};
export default ProfilePage;
