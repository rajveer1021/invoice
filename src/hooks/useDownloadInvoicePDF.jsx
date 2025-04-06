import { BASE_URL } from "../constant";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import SmallLoader from "../components/shared/loader/SmallLoader";

export const useDownloadInvoicePDF = () => {
  const { openSnackbar, closeSnackbar, closeSnackbarWithDelay } =
    useSnackbarContext();

  const downloadInvoicePDF = async (id, invoiceName) => {
    try {
      openSnackbar(
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          Downloading in progress...
          <SmallLoader size={20} marginLeft={"0.5rem"} />
        </div>
      );

      const response = await fetch(`${BASE_URL}/invoices/${id}/download`, {
        headers: {
          "Content-Type": "application/pdf",
        },
        follow: "follow",
      });

      if (!response.ok) {
        openSnackbar(`Failed to download PDF. Status: ${response.status}`);
        closeSnackbar();
        return;
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${invoiceName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      openSnackbar("Download successful!");
    } catch (error) {
      openSnackbar("Error downloading PDF!");
      closeSnackbar();
    } finally {
      closeSnackbarWithDelay(500);
    }
  };

  return downloadInvoicePDF;
};
