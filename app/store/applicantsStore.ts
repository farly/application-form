import { create } from 'zustand'

export type ApplicantFormType = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number | string;
}
export type ApplicantType = {
  id: number | string;
  primary: boolean;
  removed: boolean;
} & ApplicantFormType;

type ApplicantList = ApplicantType[];

const initialList: ApplicantList = []
//const initialList: applicantList = [...Array(5)].map((_, id) => ({
//  id,
//  firstName: `Bea${id + 1}`,
//  lastName: `Smith${id + 1}`,
//  email: `testmail${id + 1}@gmail.com`,
//  mobile: 234567898,
//  primary: id === 2,
//  removed: false,
//}));

type ApplicantsStoreType = {
  applicants: ApplicantList,
  updateApplicant: null | ApplicantType,
  setUpdateApplicant: (data: ApplicantType | null) => void,
  add: (data: ApplicantFormType) => void,
  update: (data: ApplicantType) => void,
  remove: (id: string | number, primary: boolean) => void,
  retrive: (id: string | number, primary: boolean) => void,
  setPrimary: (id: string | number) => void,
  removePrimary: (id: string | number) => void
}

const onRemoveRetriveApplicant = (
  id: string | number,
  state: ApplicantList,
  action?: "remove" | "retrive"
) => {
  if (state.length === 1) return state // do nothing
  return state.map((applicant) => {
    if (applicant.id === id)
      return {
        ...applicant,
        removed: action === "remove",
      };
    return applicant;
  })
}

const onAddApplicant = (state: ApplicantList, newApplicant: ApplicantFormType) => {
  return [...state, {
    ...newApplicant,
    id: state.length + 1,
    primary: false,
    removed: false,
  }]
}

const onUpdateApplicant = (state: ApplicantList, updatedDetails: ApplicantType) => {
  return state.map(applicant => {
    if (applicant.id === updatedDetails.id) {
      return updatedDetails
    }
    return applicant
  })
}

export const useApplicantStore = create<ApplicantsStoreType>((set) => ({
  applicants: initialList,
  updateApplicant: null,
  setUpdateApplicant: (formData: ApplicantType | null) => set(() => ({ updateApplicant: formData })),
  add: (formData: ApplicantFormType) => set((state) => ({
    applicants: onAddApplicant(state.applicants, formData)
  })),
  update: (formData: ApplicantType) => set((state) => ({
    applicants: onUpdateApplicant(state.applicants, formData)
  })),
  remove: (id: string | number,
    primary: boolean,) => primary ? null : set((state) => ({ applicants: onRemoveRetriveApplicant(id, state.applicants, "remove") })),
  retrive: (id: string | number,
    primary: boolean,) => primary ? null : set((state) => ({ applicants: onRemoveRetriveApplicant(id, state.applicants) })),
  setPrimary: (id: string | number) => set((state) => ({
    applicants: state.applicants.map((applicant) => ({
      ...applicant,
      primary: id === applicant.id,
    }))
  })),
  removePrimary: (id: string | number) => set((state) => ({
    applicants: state.applicants.map((applicant) => ({
      ...applicant,
      primary: id === applicant.id ? false : applicant.primary,
    }))
  }))
}));
