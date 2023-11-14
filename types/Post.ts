export type Address = {
  addressId: string
  country: string
  postalCode: string
  city: string
  district: string
  subDistrict: string
  area: string
  latitude: number
  longitude: number
}

export type Company = {
  compId: string
  compName: string
  compLogoKey: URL
  compDesc: string
  defaultWelfare: string
  createdDate: Date
  lastUpdate: Date
  lastActive: Date
  compUrl: URL
  address: Address
}
export type Position = {
  openPositionId: string
  openPositionTitle: string
  openPositionNum: number
  openPositionDesc: string
  positionTag: PositionTag
  workMonth: 6
  salary: 300
}

export type PositionTag = {
  positionId: string
  positionName: string
}

export type Post = {
  postId: string
  title: string
  createdDate: Date
  lastUpdateDate: Date
  closedDate: string
  totalView: number
  status: string
  postDesc: string
  comp: Company
  postWelfare: string
  enrolling: string
  documents: string
  coordinatorName: string
  tel: string
  email: string
  address: Address
  workStartTime: string
  workEndTime: string
  workDay: string
  workType: string
  openPositionList: Position[]
  postUrl: URL
}
