import { useEffect, useState, useMemo } from "react";
import { useLazyGetUsageReportQuery } from "../../services/Api"; 

export const useInvoiceQuota = (fetchOnMount = true) => {
  const [canCreateInvoice, setCanCreateInvoice] = useState(null);
  const [canCreateClient, setCanCreateClient] = useState(null);
  const [remainingInvoices, setRemainingInvoices] = useState(0);
  const [remainingClients, setRemainingClients] = useState(0);

  const [trigger, { data, error, isFetching }] = useLazyGetUsageReportQuery();

  useEffect(() => {
    if (fetchOnMount) {
      trigger();
    }
  }, [trigger, fetchOnMount]);

  useEffect(() => {
    if (data) {
      const { created_invoices, total_invoices, created_clients, total_clients } = data;
      const remainingInvoices = total_invoices - created_invoices;
      const remainingClients = total_clients - created_clients;
      
      setCanCreateInvoice(remainingInvoices > 0);
      setRemainingInvoices(remainingInvoices);
      setCanCreateClient(remainingClients > 0);
      setRemainingClients(remainingClients);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setCanCreateInvoice(false);
      setCanCreateClient(false);
      setRemainingInvoices(0);
      setRemainingClients(0);
    }
  }, [error]);

  return useMemo(() => ({
    canCreateInvoice,
    canCreateClient,
    remainingInvoices,
    remainingClients,
    isLoading: isFetching || canCreateInvoice === null || canCreateClient === null,
    error,
    refetch: trigger,
  }), [canCreateInvoice, canCreateClient, remainingInvoices, remainingClients, isFetching, error, trigger]);
};