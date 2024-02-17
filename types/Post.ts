export type Address = {
  addressId: string
  area: string
  city: string
  country: string
  district: string
  latitude: number
  longitude: number
  postalCode: string
  subDistrict: string
}

export type Company = {
  address: Address
  compDesc: string
  compId: string
  compLogoKey: URL
  compName: string
  compUrl: URL
  createdDate: Date
  defaultWelfare: string
  lastActive: Date
  lastUpdate: Date
}

export type Position = {
  openPositionDesc: string
  openPositionId: string
  openPositionNum: number
  openPositionTitle: string
  salary: number | null
  workMonth: number
}

export type PositionTag = {
  positionTagName: string
}

export type PostTag = {
  postPositionTagId: string
  positionTag: string
}

export type Post = {
  address: Address
  closedDate: string
  comp: Company
  coordinatorName: string
  createdDate: Date | null
  documents: string[]
  email: string
  enrolling: string
  lastUpdateDate: Date
  openPositionList: Position[]
  postDesc: string
  postId: string
  postTagList: string[]
  postUrl: URL | null
  postWelfare: string
  status: string
  tel: string
  title: string
  totalView: number
  workDay: string[]
  workEndTime: string
  workStartTime: string
  workType: string
}
