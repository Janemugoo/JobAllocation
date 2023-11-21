import { initFirestore } from "@/constants/firebase";
import { Staff } from "@/services";
import { useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const store = initFirestore();
export function useStaff() {
  const staff = useMemo(() => new Staff(store), []);
  const [staffs]=useCollection (staff.getStaffs()) 
  
  const [staffRowId, setStaffRowId] = useState<string | null>(null);
  const [staffFields, setStaffFields] = useState({
    staffName: "",
    staffDepartment: "",
  });
  const updateStaffRow = async (docID: string, updatedFields: any) => {
    //check on the type, updateStaffRow responsible for updating the staff row
    await staff.updateStaffRow(docID, updatedFields);
    setStaffRowId(null);
  };
  const deleteStaffRow = async (staffID: string) => {
    await staff.deleteStaffRow(staffID);
  };
  const staffNames= useMemo( ()=> {
    return staffs?.docs.map((doc)=>{
      const staff=doc.data()
      return {
        name:staff.staffName, 
        docID: doc.id
      };
    })
  },[staffs])

  return {
    Staff: staff,
    deleteStaffRow,
    staffRowId,
    staffFields,
    setStaffRowId,
    setStaffFields,
    updateStaffRow,
    staffNames,
    staffs,
  };
}

export function useAssignableStaff() {
  const staff = useMemo(() => new Staff(store), []);
  const [tasks, loading, error] = useCollection(staff.getAssignableStaff());
  return {};
}

export function useGetStaffs() {
  const staff = useMemo(() => new Staff(store), []);
  const [staffs, loading, error] = useCollection(staff.getStaffs());
  return { staffs, loading, error };
}
