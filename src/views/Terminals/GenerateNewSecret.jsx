import { Row, Button, Space } from "antd";
import { terminalsAPI } from "../../services/queries/management/terminals";
import { useMutation } from "react-query";
import { Loading, ErrorModal, SuccessModal } from "../../Components/Common/";
import { parseError } from "../../helpers/parseError";

export const GenerateNewSecret = ({ handleClose, terminal_guid }) => {
  const mutation = useMutation(terminalsAPI.generateTerminalCredentials);

  const onCancel = () => {
    handleClose();
  };

  const onSubmit = async () => {
    try {
      await mutation.mutateAsync(terminal_guid);
      SuccessModal("Credentials was generated");
      handleClose();
    } catch (error) {
      ErrorModal(parseError(error));
    }
  };

  return (
    <>
      <Row justify="center">
        <span style={{ fontWeight: "bold" }}> Are you sure?</span>
      </Row>
      <Row justify="center">
        <p>You want to generate a new secret and hash key</p>
      </Row>
      <Row justify="center">
        {mutation.isLoading ? (
          <Loading />
        ) : (
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={onSubmit}>
              Generate
            </Button>
          </Space>
        )}
      </Row>
    </>
  );
};
