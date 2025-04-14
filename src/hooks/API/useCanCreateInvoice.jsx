import { useEffect, useState } from "react";
import { useLazyGetUsageReportQuery } from "../../services/Api"; 

export const useCanCreateInvoice = () => {
  const [canCreate, setCanCreate] = useState(null);
  const [remainingInvoices, setRemainingInvoices] = useState(0);

  const [trigger, { data, error, isFetching }] = useLazyGetUsageReportQuery();

  useEffect(() => {
    trigger(); 
  }, [trigger]);

  useEffect(() => {
    if (data) {
      const { created_invoices, total_invoices } = data;
      const remaining = total_invoices - created_invoices;

      setCanCreate(remaining > 0);
      setRemainingInvoices(remaining);
    }
  }, [data]);

  return {
    canCreateInvoice: canCreate,
    remainingInvoices,
    isLoading: isFetching,
    error,
    refetch: trigger,
  };
};
