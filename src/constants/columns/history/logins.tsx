import { useMemo } from "react";

export default function useLoginsAuditColumns(ability) {
  return useMemo(
    () => [
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "Guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Auth type ",
        dataIndex: "auth_type",
        key: "auth_type",
      },
      {
        title: "Company address ",
        dataIndex: "company_address",
        key: "company_address",
      },
      {
        title: "Company name",
        dataIndex: "company_name",
        key: "company_name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "First name",
        dataIndex: "first_name",
        key: "first_name",
      },
      {
        title: "Last name",
        dataIndex: "last_name",
        key: "last_name",
      },
      {
        title: "Enabled",
        dataIndex: "enabled",
        key: "enabled",
      },
      {
        title: "Language",
        dataIndex: "language",
        key: "language",
      },
      {
        title: "Locked",
        dataIndex: "locked",
        key: "locked",
      },
      {
        title: "Reason",
        dataIndex: "reason",
        key: "reason",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
      {
        title: "Author",
        dataIndex: "author_username",
        key: "author_username",
      },
    ],
    [ability]
  );
}
