import * as React from "react";
import Layout from "../components/Layout";

import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { PlayArrow, Pause } from "@material-ui/icons";

import { UsersComponent } from "../generated/apolloComponents";
import CreateUserModal from "../components/modals/CreateUserModal";
import EditUserModal from "../components/modals/EditUserModal";
import DeleteUserModal from "../components/modals/DeleteUserModal";

import { green, red } from "@material-ui/core/colors";
import Loading from "../components/Loading";

import styled from "styled-components";

const ActionButtons = styled.div`
  display: "flex";
`;

const StyledIconButton = styled(IconButton as any)`
  background-color: green;
  @media (max-width: 959px) {
    display: none !important;
  }
`;

const columns = [
  {
    name: "id",
    label: "id",
    options: {
      filter: false,
      sort: false,
      display: false,
    },
  },
  {
    name: "firstName",
    label: "Ime",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "lastName",
    label: "Prezime",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "companyName",
    label: "Kompanija",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "isActive",
    label: "Status",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value: Boolean) => (
        <div>
          {value ? (
            <Tooltip title="Aktivan" placement="bottom-start">
              <StyledIconButton aria-label="Aktivan">
                <PlayArrow style={{ color: green[500] }} />
              </StyledIconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Neaktivan" placement="bottom-start">
              <StyledIconButton style={{ color: red[500] }} aria-label="Neaktivan">
                <Pause />
              </StyledIconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  },
  {
    name: "options",
    label: "Opcije",
    options: {
      filter: false,
      sort: false,
      // @ts-ignore
      customBodyRender: (_, tableMeta) => (
        <ActionButtons>
          <EditUserModal user={tableMeta.rowData} />
          <DeleteUserModal user={tableMeta.rowData} />
        </ActionButtons>
      ),
    },
  },
];

const options: MUIDataTableOptions = {
  filterType: "dropdown",
  //responsive: "scroll",
  selectableRows: false,
  customToolbar: () => <CreateUserModal />,
};

const IndexPage: React.FunctionComponent = () => {
  const [getRowsPerPage, setRowsPerPage] = React.useState(10);
  return (
    <Layout title="Admin panel">
      <UsersComponent>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <MUIDataTable
                title={"Lista korisnika"}
                data={
                  data
                    ? data.users
                        .filter(user => !user.isAdmin)
                        .map(user => {
                          return new Object({ ...user, key: user.id });
                        })
                    : []
                }
                // @ts-ignore
                columns={columns}
                options={{
                  ...options,
                  rowsPerPage: getRowsPerPage,
                  onChangeRowsPerPage: rows => {
                    setRowsPerPage(rows);
                  },
                }}
              />
            </>
          );
        }}
      </UsersComponent>
    </Layout>
  );
};

export default IndexPage;
