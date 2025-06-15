export type PatientResponse = {
  id: number
  firstName: string
  lastName: string
  nationalId: string
  phoneNumber: string
  detail?: string
  treatmentCount?: number
}
