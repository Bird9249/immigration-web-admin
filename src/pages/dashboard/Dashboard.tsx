import Tabs from "../../components/tabs/Tabs";

export default () => {
  return (
    <div class="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 class="text-gray-900 text-xl dark:text-white">ຍີນດີຕອນຮັບ</h1>

      <Tabs
        items={[
          {
            key: "profile",
            label: "Profile",
            content: <h1>Profile</h1>,
          },
          { key: "dashboard", label: "Dashboard", content: <h1>Dashboard</h1> },
          { key: "setting", label: "Settings", content: <h1>Settings</h1> },
        ]}
      />
    </div>
  );
};
