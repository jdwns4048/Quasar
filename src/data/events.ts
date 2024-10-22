//활동
//실적 입력 활동 => skedCode: 'SA~'
//실적 미입력 활동 => skedCode: 'SP~'

//유형
//고객미팅 => category: '301'
//입찰 => category: '305'
//제안 => category: '302'
//출장 => category: '303'
//내근 => category: '304'

export const eventItems = [
    //실적 미입력-고객미팅
    {
        skedCode: 'SP0000063',
        title: '미라콤 아치스 솔루션 시연회',
        category: '301',
        result: null,
        start: '2024-07-29 00:00:30',
        end: '2024-07-29 00:00:30',
        createUserId: 'xeno01',
        createUserName: '제노1',
        createDateTime: '2024-07-22 15:44:20.263',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['suilko', 'sypark'],
        attachments: ['e96845eb-aec5-4c4c-bacc-e914715ee294']
    },

    //실적 미입력-출장
    {
        skedCode: 'SP0000065',
        title: 'CRM 도입 관련 마산/구미 공장 방문',
        category: '303',
        result: null,
        start: '2024-07-30 00:00:30',
        end: '2024-07-31 00:00:30',
        createUserId: 'xeno01',
        createUserName: '제노1',
        createDateTime: '2024-07-23 13:27:43.573',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['jyysoul', 'kamyi1004'],
        attachments: []
    },

    //실적 미입력-고객미팅
    {
        skedCode: 'SP0000071',
        title: '8월 농심 수급협의체 회의',
        category: '301',
        result: null,
        start: '2024-08-22 00:00:30',
        end: '2024-08-22 09:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-12 11:31:18.203',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: ['9ad367c5-42ee-4cce-a7c8-013c2ccf1769', '82abde14-d97e-42c2-9dbc-722e96123955']
    },

    //실적 미입력-제안
    {
        skedCode: 'SP0000083',
        title: 'VOC 처리 프로세스 협의',
        category: '302',
        result: null,
        start: '2024-08-26 09:00:30',
        end: '2024-08-30 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-13 12:58:00.354',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['kamyi1004', 'suilko'],
        attachments: []
    },

    //실적 미입력-고객미팅
    {
        skedCode: 'SP0000084',
        title: '영업 미팅',
        category: '301',
        result: null,
        start: '2024-07-25 00:00:30',
        end: '2024-07-31 00:00:30',
        createUserId: 'xenopjw',
        createUserName: '박정우',
        createDateTime: '2024-08-21 09:30:21.157',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 미입력-내근
    {
        skedCode: 'SP0000085',
        title: 'T-CRM 주요 기능 시연',
        category: '304',
        result: null,
        start: '2024-08-27 09:00:30',
        end: '2024-08-27 09:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-22 20:37:54.493',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['sypark', 'kamyi1004', 'jyysoul', 'suilko'],
        attachments: ['cdf01179-067e-47e5-88b1-9cc4893047ac']
    },

    //실적 미입력-내근
    {
        skedCode: 'SP0000086',
        title: 'CRM 프로젝트 실무자 회의',
        category: '304',
        result: null,
        start: '2024-08-27 09:00:30',
        end: '2024-08-27 09:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-27 13:45:12.591',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['kamyi1004', 'suilko'],
        attachments: ['2bd5f491-d427-4e02-aeb8-d3e9dad004d2']
    },

    //실적 미입력-입찰
    {
        skedCode: 'SP0000091',
        title: '입찰 테스트',
        category: '305',
        result: null,
        start: '2024-08-15 00:00:30',
        end: '2024-08-15 00:00:30',
        createUserId: 'xenopjw',
        createUserName: '박정우',
        createDateTime: '2024-09-19 16:53:56.393',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 입력-제안
    {
        skedCode: 'SA0000064',
        title: '실적 활동 추가 test',
        category: '302',
        result: '1010',
        start: '2024-07-25 00:00:30',
        end: '2024-07-29 00:00:30',
        createUserId: 'xenoljh',
        createUserName: '이정현',
        createDateTime: '2024-07-25 09:34:39.834',
        createDeptName: 'IT팀 팀원',
        planYn: 'N',
        ccList: ['arches', 'xenoljh'],
        attachments: []
    },

    //실적 입력-출장
    {
        skedCode: 'SA0000065',
        title: '출장 활동 추가 TEST',
        category: '303',
        result: null,
        start: '2024-07-23 00:00:30',
        end: '2024-08-01 00:00:30',
        createUserId: 'xenoljh',
        createUserName: '이정현',
        createDateTime: '2024-07-25 13:18:47.311',
        createDeptName: 'IT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 입력-제안
    {
        skedCode: 'SA0000067',
        title: '영업 활동 테스트',
        category: '302',
        result: '1010',
        start: '2024-08-08 00:00:30',
        end: '2024-08-23 00:00:30',
        createUserId: 'xeno01',
        createUserName: '제노1',
        createDateTime: '2024-08-08 10:41:55.603',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['archkyc'],
        attachments: []
    },

    //실적 입력-제안
    {
        skedCode: 'SA0000068',
        title: '고객솔루션제안 ',
        category: '302',
        result: '1010',
        start: '2024-08-08 00:00:30',
        end: '2024-08-16 00:00:30',
        createUserId: 'xeno01',
        createUserName: '제노1',
        createDateTime: '2024-08-08 11:04:57.694',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'N',
        ccList: ['hklee'],
        attachments: ['c35a1e24-eb91-4a55-9048-9382f33e041b']
    },

    //실적 입력-내근
    {
        skedCode: 'SA0000069',
        title: 'CRM 프로젝트 주간보고',
        category: '304',
        result: null,
        start: '2024-08-06 00:00:30',
        end: '2024-08-06 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-12 17:45:06.561',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['jyysoul', 'kamyi1004', 'suilko'],
        attachments: ['d9421094-fe68-405e-bd75-3452743936b6']
    },

    //실적 입력-내근
    {
        skedCode: 'SA0000070',
        title: 'CRM 프로젝트 실무자회의',
        category: '304',
        result: null,
        start: '2024-08-13 00:00:30',
        end: '2024-08-13 09:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-12 17:52:49.64',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['suilko', 'kamyi1004'],
        attachments: ['96e7cbad-7dd4-4715-9dbd-804f645dd9f6', '5c738d14-eedb-4da0-b1a4-0f3441422c8b']
    },

    //실적 입력-내근
    {
        skedCode: 'SA0000071',
        title: 'CRM 프로젝트 데모 리허설 준비',
        category: '304',
        result: null,
        start: '2024-08-12 00:00:30',
        end: '2024-08-12 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-12 17:53:31.789',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['suilko', 'jyysoul'],
        attachments: ['d26803dd-81aa-4fcb-a895-9062da3c3b50']
    },

    //실적 입력-내근
    {
        skedCode: 'SA0000072',
        title: 'CRM 프로젝트 주간보고',
        category: '304',
        result: null,
        start: '2024-08-13 00:00:30',
        end: '2024-08-13 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-12 17:53:59.203',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['jyysoul', 'kamyi1004', 'suilko'],
        attachments: ['cb7f26b0-f4b1-497e-add6-fe2855ea5e1a']
    },

    //실적 입력-내근
    {
        skedCode: 'SA0000073',
        title: '주간업무보고 양식 확정 및 공유',
        category: '304',
        result: null,
        start: '2024-08-13 00:00:30',
        end: '2024-08-13 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-13 15:20:51.638',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'N',
        ccList: ['kamyi1004', 'jyysoul', 'suilko'],
        attachments: ['94a97785-543d-4fb0-a9ec-b93f1b2bbf7c']
    },

    //실적 입력-출장
    {
        skedCode: 'SA0000074',
        title: '양산 공장 생산캐파 확인 ',
        category: '303',
        result: null,
        start: '2024-08-14 00:00:30',
        end: '2024-08-16 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-27 13:59:17.376',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['suilko'],
        attachments: []
    },

    //실적 입력-고객미팅
    {
        skedCode: 'SA0000075',
        title: '농심 안성공장 품질 이슈 개선 대책 발표',
        category: '301',
        result: null,
        start: '2024-08-19 00:00:30',
        end: '2024-08-19 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-27 14:00:16.073',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 입력-고객미팅
    {
        skedCode: 'SA0000076',
        title: '농심 미팅',
        category: '301',
        result: null,
        start: '2024-08-21 00:00:30',
        end: '2024-08-21 09:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-27 14:01:03.229',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 입력-제안
    {
        skedCode: 'SA0000077',
        title: '아모레퍼시픽 플라스틱 단프라 소재전환 제안',
        category: '302',
        result: '1010',
        start: '2024-08-20 09:00:30',
        end: '2024-08-20 09:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-08-27 14:01:15.686',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 입력-고객미팅
    {
        skedCode: 'SA0000078',
        title: '영업활동 고객미팅 테스트',
        category: '301',
        result: null,
        start: '2024-08-13 00:00:30',
        end: '2024-08-13 00:00:30',
        createUserId: 'jyysoul',
        createUserName: '정윤영',
        createDateTime: '2024-09-11 13:50:48.065',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['jyysoul'],
        attachments: []
    },

    //실적 입력-입찰
    {
        skedCode: 'SA0000080',
        title: '0819 입찰 계획',
        category: '305',
        result: '1011',
        start: '2024-08-19 00:00:30',
        end: '2024-08-19 00:00:30',
        createUserId: 'xenopjw',
        createUserName: '박정우',
        createDateTime: '2024-09-19 16:19:30.377',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: []
    },

    //실적 미입력-고개미팅
    {
        skedCode: 'SP0000087',
        title: 'test',
        category: '301',
        result: null,
        start: '2024-09-27 00:00:30',
        end: '2024-09-27 00:00:30',
        createUserId: 'xeno01',
        createUserName: '제노1',
        createDateTime: '2024-09-04 13:42:22.343',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['archkhd'],
        attachments: []
    },

    //실적 미입력-고객미팅
    {
        skedCode: 'SP0000095',
        title: '활동 추가 테스트',
        category: '301',
        result: null,
        start: '2024-09-24 00:00:30',
        end: '2024-09-26 00:00:30',
        createUserId: 'xenoydy',
        createUserName: '윤다연',
        createDateTime: '2024-10-07 13:40:16.712',
        createDeptName: '상자영업2팀 팀원',
        planYn: 'Y',
        ccList: [],
        attachments: ['be3dbc24-e5bb-4723-811d-1c3a33cec896']
    },

    //실적 입력-입찰
    {
        skedCode: 'SA0000079',
        title: '0919 입찰 등록',
        category: '305',
        result: '1010',
        start: '2024-09-19 09:00:30',
        end: '2024-09-19 09:00:30',
        createUserId: 'xenopjw',
        createUserName: '박정우',
        createDateTime: '2024-09-19 14:22:32.797',
        createDeptName: 'KEY ACCOUNT팀 팀원',
        planYn: 'Y',
        ccList: ['CT00003978', 'jhyum'],
        attachments: ['78067753-3be5-4062-9061-b17e775bca75']
    },

    //실적 미입력-고객미팅
    {
        skedCode: 'SP0000093',
        title: '영업 활동 계획 테스트',
        category: '301',
        result: null,
        start: '2024-09-24 00:00:30',
        end: '2024-09-30 00:00:30',
        createUserId: 'jhyum',
        createUserName: '염정현',
        createDateTime: '2024-09-24 13:49:41.988',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['xenopjw'],
        attachments: ['b0f1ca86-4d98-4f64-a9a1-bed94a805c57']
    },

    //실적 입력-고객미팅
    {
        skedCode: 'SA0000083',
        title: '관련조직 테스트',
        category: '301',
        result: null,
        start: '2024-09-25 00:00:30',
        end: '2024-10-01 00:00:30',
        createUserId: 'jhyum',
        createUserName: '염정현',
        createDateTime: '2024-09-25 16:57:04.969',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['xenopjw'],
        attachments: ['190b5946-2439-45f2-b6f1-fcf2cec54b62']
    },
    {
        skedCode: 'SA0000083',
        title: '관련조직 테스트',
        category: '301',
        result: null,
        start: '2024-10-20 00:00:30',
        end: '2024-11-01 00:00:30',
        createUserId: 'jhyum',
        createUserName: '염정현',
        createDateTime: '2024-09-25 16:57:04.969',
        createDeptName: '상자영업1팀 팀원',
        planYn: 'Y',
        ccList: ['xenopjw'],
        attachments: ['190b5946-2439-45f2-b6f1-fcf2cec54b62']
    }
];
