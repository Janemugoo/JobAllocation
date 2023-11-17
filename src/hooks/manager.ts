import { initFirestore } from "@/constants/firebase";
import { Manager } from "@/services";
import { useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { deleteDoc, doc } from "firebase/firestore";

const store = initFirestore();

export function useManager() {
  const manager = useMemo(() => new Manager(store), []);
  const [managerRowId, setManagerRowId] = useState<string | null>( null);
  const [managerFields, setManagerFields] = useState({
    managerName: "",
    managerDepartment: "",
  });
  const updateManagerRow = async (managerID: string, updatedFields: any) => {
    //check on the type, updateManagerRow responsible for updating the manager row
    await manager.updateManagerRow(managerID, updatedFields);
    setManagerRowId(null);
  };

  const deleteManagerRow = async (managerID: string) => {
    await manager.deleteManagerRow(managerID);
  };

  return {
    Manager: manager,
    deleteManagerRow,
    managerRowId,
    managerFields,
    setManagerRowId,
    setManagerFields,
    updateManagerRow,
  };
}

export function useGetManagers() {
  const manager = useMemo(() => new Manager(store), []);
  const [managers, loading, error] = useCollection(manager.getManagers());
  return { managers, loading, error };
}
