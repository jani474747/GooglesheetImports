export const userColumns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email"
    },
    {
      title: "Mobile",
      dataIndex: "Mobile",
      key: "mobile"
    },
    {
      title: "Address",
      key: "address",
      render: record => {
        return Object.values(record.address)
          .filter(val => typeof val !== "object")
          .join(" ");
      }
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "country"
    },
   
  ];
  