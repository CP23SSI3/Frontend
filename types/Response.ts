export type Response = {
  message: string
  status: number
}

export type ResponseList = Response & {
  data: {
    number: number
    size: number
    totalPages: number
    totalElements: number
  }
}

// {
//   "status": 200,
//   "message": "The post is succesfullysended",
//   "data": {
//       "number": 0,
//       "size": 10,
//       "totalPages": 1,
//       "totalElements": 1,
//       "content": [
//           {
//               "postId": "eba83fe4-937b-4054-a420-d977534feebe",
//               "title": "ประกาศรับฝึกงาน ด่วนที่สุด บริษัทตามใจฉัน",
//               "createdDate": "2023-10-04T06:30:00Z",
//               "lastUpdateDate": "2023-10-05T06:30:00Z",
//               "closedDate": null,
//               "totalView": 125,
//               "status": "OPENED",
//               "postDesc": "ประกาศรับฝึกงานด่วนที่สุดแต่ตลอดทั้งปี นี่คือส่วนหนึ่งของตัวอย่างรายละเอียดข้อมูล",
//               "comp": {
//                   "compId": "8e20782f-2807-4f13-a11e-0fb9ff955488",
//                   "compName": "Test company",
//                   "compLogoKey": "https://www.google.com",
//                   "compDesc": "This is a compDesc as an example. Hope we will be able to make a move soon",
//                   "defaultWelfare": "Lorem for the welfare for this company, This is the example script only",
//                   "createdDate": "2023-10-04T06:30:00Z",
//                   "lastUpdate": "2023-10-04T06:30:00Z",
//                   "lastActive": "2023-10-04T06:30:00Z",
//                   "compUrl": "https://www.google.com",
//                   "address": {
//                       "addressId": "9346a466-4a82-4037-ab00-72ba24fa50bf",
//                       "country": "Thailand",
//                       "postalCode": "10120",
//                       "city": "Bangkok",
//                       "district": "Sathorn",
//                       "subDistrict": "ThungWatDon",
//                       "area": "17 Chan road",
//                       "latitude": 13.70536800,
//                       "longitude": 100.53315270
//                   }
//               },
//               "postWelfare": "สวัสดิการพื้นฐาน : กินขนมฟรี ข้าวฟรี ไม่มีเงินเดือน",
//               "enrolling": "ติดต่อไนซ์ วิชชุตา พิภพภิญโญสำหรับข้อมูลเพิ่มเติม กรุณาติดต่อผ่านอีเมลที่ระบุเอาไว้เท่านั้น",
//               "documents": "port-folio,resume,cv",
//               "coordinatorName": "Vichuta Pipoppinyo",
//               "tel": "012-345-6789",
//               "email": "nice.vct@mail.kmutt.ac.th",
//               "address": {
//                   "addressId": "9346a466-4a82-4037-ab00-72ba24fa50bf",
//                   "country": "Thailand",
//                   "postalCode": "10120",
//                   "city": "Bangkok",
//                   "district": "Sathorn",
//                   "subDistrict": "ThungWatDon",
//                   "area": "17 Chan road",
//                   "latitude": 13.70536800,
//                   "longitude": 100.53315270
//               },
//               "workStartTime": "09:30:00",
//               "workEndTime": "17:30:00",
//               "workDay": "mon,tue,wed,thu,fri",
//               "workType": "HYBRID",
//               "openPositionList": [
//                   {
//                       "openPositionId": "24526070-68cf-48ff-8d02-29e9d05aeda2",
//                       "openPositionTitle": "Frontend Developer",
//                       "openPositionNum": 4,
//                       "openPositionDesc": "Working on Frontend mainly, using React",
//                       "positionTag": {
//                           "positionId": "04a6ab2d-c1fc-44e2-b46c-b5193fb20bf7",
//                           "positionName": "Front-end developer"
//                       },
//                       "workMonth": 6,
//                       "salary": 300
//                   },
//                   {
//                       "openPositionId": "72d02945-9f1b-401a-9809-b10aff9406cc",
//                       "openPositionTitle": "Backend developer",
//                       "openPositionNum": 2,
//                       "openPositionDesc": "Open position - for Java or Kotlin",
//                       "positionTag": {
//                           "positionId": "a27c36fd-9ed4-4de7-ad8e-f5334953944d",
//                           "positionName": "Backend-end developer"
//                       },
//                       "workMonth": 4,
//                       "salary": 250
//                   }
//               ]
//           }
//       ]
//   }
// }
