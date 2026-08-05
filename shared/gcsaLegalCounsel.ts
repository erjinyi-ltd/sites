export type GcsaLegalLocale = 'zh-CN' | 'zh-Hant' | 'en'

export interface GcsaLegalCounselProfile {
  name: string
  secondaryName?: string
  location: string
  summary: string
  office: string
  focus: [string, string, string]
  about: string[]
}

interface GcsaLegalCounselCopy {
  heading: string
  navigationLabel: string
  viewIntroduction: string
  close: string
  office: string
  practiceFocus: string
  aboutFirm: string
  profiles: [GcsaLegalCounselProfile, GcsaLegalCounselProfile, GcsaLegalCounselProfile]
}

const legalCounselCopy: Record<GcsaLegalLocale, GcsaLegalCounselCopy> = {
  'zh-CN': {
    heading: 'GCSA 法律顾问',
    navigationLabel: '法律顾问',
    viewIntroduction: '查看{name}简介',
    close: '关闭',
    office: '办公地址',
    practiceFocus: '擅长领域',
    aboutFirm: '机构简介',
    profiles: [
      {
        name: '葡萄牙&澳门 弗朗西斯科·尼古劳博士律师事务所',
        secondaryName: 'Dr. Francisco Nicolau & Associados',
        location: '里斯本 · 澳门',
        summary: '里斯本与澳门全方位法律事务所 · 横跨葡萄牙与澳门三十余年的卓越法律实践。',
        office: '里斯本：Rua Manuela Porto, No. 10, 2º Esq., 1500-422 Lisbon, Portugal；澳门：1/F, No. 194 Xinma Road, Macau',
        focus: ['民法', '刑法', '跨境诉讼'],
        about: [
          '弗朗西斯科·尼古劳博士律师事务所在里斯本与澳门设有办公室，植根于横跨葡萄牙与澳门三十余年的卓越法律实践，为个人、企业、机构及公共部门提供严谨、正直且具国际视野的法律咨询。',
          '在弗朗西斯科·尼古劳博士——法学博士、资深出庭律师——的带领下，本所将深厚的法理学素养与三十六年的庭审经验融为一体，以葡、英、法、中及拉丁五种语言提供服务，为现代跨境客户带来严谨的大陆法系传统。',
          '业务涵盖民法、刑法、劳动法、行政法、民事诉讼与宪法等领域，并在葡萄牙与澳门各级法院拥有超过三十六年的出庭经验。',
        ],
      },
      {
        name: '香港麦家荣律师行',
        secondaryName: 'Patrick Mak & Tse Solicitors',
        location: '香港 · 中环',
        summary: '扎根香港、放眼海外的综合性律师行，提供诉讼与非诉讼全方位多元化法律服务。',
        office: '香港中环干诺道中 111 号永安中心 9 楼',
        focus: ['企业融资', '商业及民事诉讼', '内地委托公证人'],
        about: [
          '香港麦家荣律师行是一家扎根于香港、放眼于海外且具规模的综合性律师事务所，能够提供诉讼和非诉讼全方位多元化服务。',
          '自成立以来，香港麦家荣律师行在企业融资、商业及民事诉讼、内地委托公证人服务等核心法律服务中业绩卓著，并以务实的办事态度、专业的法律知识和丰富的行业经验，为各地客户提供高效率及高质量的法律服务。',
          '2024 年，香港麦家荣律师行荣膺 MYTHFOCUS 所颁发亚洲最有价值品牌大奖中的“大中华年度最佳法律顾问服务”奖项，展现了其不仅为客户提供超出预期的服务与优质体验，更具备预判及克服商业问题、持续提升服务能力以及对行业与社会的不懈贡献。',
          '在持续服务客户的过程中，香港麦家荣律师行与相关监管部门及国内外众多证券公司、投资银行、会计师事务所、资产评估机构及其他律师事务所建立了良好的业务联系，并积累了与政府机关及监管部门沟通协作的丰富经验，能够发挥优势、整合资源，为客户提供优质高效的法律服务。',
        ],
      },
      {
        name: '广东元数律师事务所',
        secondaryName: 'Prime Partners',
        location: '广州 · 珠江新城',
        summary: '专注互联网、人工智能与数字经济的综合性精品律所，立足华南、辐射大湾区、走向全国。',
        office: '广州市天河区珠江新城凯华国际中心 17 楼',
        focus: ['互联网', '人工智能', '数字经济'],
        about: [
          '广东元数律师事务所（以下简称“元数律师事务所”）于 2026 年 6 月由一群志同道合的律师发起设立，是一家专注于互联网、人工智能与数字经济领域的综合性精品律所。',
          '合伙人背景多元、能力互补——既有省、市律协互联网及知识产权相关专业委员会的主任、副主任，也有从头部互联网公司走出的前法务负责人。多元基因的碰撞，使“元数”自诞生起便兼具行业洞察、监管视野与商业思维。',
          '秉持“法之元、理之数”的理念，元数律师事务所已为字节跳动、华为等头部企业提供法律服务，立足华南，辐射大湾区，走向全国。',
        ],
      },
    ],
  },
  'zh-Hant': {
    heading: 'GCSA 法律顧問',
    navigationLabel: '法律顧問',
    viewIntroduction: '查看{name}簡介',
    close: '關閉',
    office: '辦公地址',
    practiceFocus: '擅長領域',
    aboutFirm: '機構簡介',
    profiles: [
      {
        name: '葡萄牙&澳門 弗朗西斯科·尼古勞博士律師事務所',
        secondaryName: 'Dr. Francisco Nicolau & Associados',
        location: '里斯本 · 澳門',
        summary: '里斯本與澳門全方位法律事務所 · 橫跨葡萄牙與澳門三十餘年的卓越法律實踐。',
        office: '里斯本：Rua Manuela Porto, No. 10, 2º Esq., 1500-422 Lisbon, Portugal；澳門：1/F, No. 194 Xinma Road, Macau',
        focus: ['民法', '刑法', '跨境訴訟'],
        about: [
          '弗朗西斯科·尼古勞博士律師事務所在里斯本與澳門設有辦公室，植根於橫跨葡萄牙與澳門三十餘年的卓越法律實踐，為個人、企業、機構及公共部門提供嚴謹、正直且具國際視野的法律諮詢。',
          '在弗朗西斯科·尼古勞博士——法學博士、資深出庭律師——的帶領下，本所將深厚的法理學素養與三十六年的庭審經驗融為一體，以葡、英、法、中及拉丁五種語言提供服務，為現代跨境客戶帶來嚴謹的大陸法系傳統。',
          '業務涵蓋民法、刑法、勞動法、行政法、民事訴訟與憲法等領域，並在葡萄牙與澳門各級法院擁有超過三十六年的出庭經驗。',
        ],
      },
      {
        name: '香港麥家榮律師行',
        secondaryName: 'Patrick Mak & Tse Solicitors',
        location: '香港 · 中環',
        summary: '扎根香港、放眼海外的綜合性律師行，提供訴訟與非訴訟全方位多元化法律服務。',
        office: '香港中環干諾道中 111 號永安中心 9 樓',
        focus: ['企業融資', '商業及民事訴訟', '內地委託公證人'],
        about: [
          '香港麥家榮律師行是一家扎根於香港、放眼於海外且具規模的綜合性律師事務所，能夠提供訴訟和非訴訟全方位多元化服務。',
          '自成立以來，香港麥家榮律師行在企業融資、商業及民事訴訟、內地委託公證人服務等核心法律服務中業績卓著，並以務實的辦事態度、專業的法律知識和豐富的行業經驗，為各地客戶提供高效率及高質量的法律服務。',
          '2024 年，香港麥家榮律師行榮膺 MYTHFOCUS 所頒發亞洲最有價值品牌大獎中的「大中華年度最佳法律顧問服務」獎項，展現了其不僅為客戶提供超出預期的服務與優質體驗，更具備預判及克服商業問題、持續提升服務能力以及對行業與社會的不懈貢獻。',
          '在持續服務客戶的過程中，香港麥家榮律師行與相關監管部門及國內外眾多證券公司、投資銀行、會計師事務所、資產評估機構及其他律師事務所建立了良好的業務聯繫，並積累了與政府機關及監管部門溝通協作的豐富經驗，能夠發揮優勢、整合資源，為客戶提供優質高效的法律服務。',
        ],
      },
      {
        name: '廣東元數律師事務所',
        secondaryName: 'Prime Partners',
        location: '廣州 · 珠江新城',
        summary: '專注互聯網、人工智能與數字經濟的綜合性精品律所，立足華南、輻射大灣區、走向全國。',
        office: '廣州市天河區珠江新城凱華國際中心 17 樓',
        focus: ['互聯網', '人工智能', '數字經濟'],
        about: [
          '廣東元數律師事務所（以下簡稱「元數律師事務所」）於 2026 年 6 月由一群志同道合的律師發起設立，是一家專注於互聯網、人工智能與數字經濟領域的綜合性精品律所。',
          '合夥人背景多元、能力互補——既有省、市律協互聯網及知識產權相關專業委員會的主任、副主任，也有從頭部互聯網公司走出的前法務負責人。多元基因的碰撞，使「元數」自誕生起便兼具行業洞察、監管視野與商業思維。',
          '秉持「法之元、理之數」的理念，元數律師事務所已為字節跳動、華為等頭部企業提供法律服務，立足華南，輻射大灣區，走向全國。',
        ],
      },
    ],
  },
  en: {
    heading: 'GCSA Legal Counsel',
    navigationLabel: 'Legal counsel',
    viewIntroduction: 'View introduction for {name}',
    close: 'Close',
    office: 'Office',
    practiceFocus: 'Practice focus',
    aboutFirm: 'About the firm',
    profiles: [
      {
        name: 'Portugal & Macau Dr. Francisco Nicolau & Associados',
        location: 'Lisbon · Macau',
        summary: 'A full-service firm with offices in Lisbon and Macau—more than three decades of distinguished advocacy across Portugal and Macau.',
        office: 'Lisbon: Rua Manuela Porto, No. 10, 2º Esq., 1500-422 Lisbon, Portugal; Macau: 1/F, No. 194 Xinma Road, Macau',
        focus: ['Civil Law', 'Criminal Law', 'Cross-Border Litigation'],
        about: [
          'Dr. Francisco Nicolau & Associados is a full-service law firm with offices in Lisbon and Macau, founded on more than three decades of distinguished legal practice across Portugal and Macau. The firm delivers rigorous, principled, and internationally minded counsel to individuals, enterprises, institutions, and public bodies.',
          'Under the leadership of Dr. Francisco Nicolau—a Doctor of Legal Sciences and seasoned advocate—the firm unites deep doctrinal scholarship with 36 years of courtroom experience. We advise in Portuguese, English, French, Chinese, and Latin, bringing a rigorous civil-law tradition to the needs of a modern, cross-border clientele.',
          'Practice areas span civil law, criminal law, labour law, administrative law, civil procedure, and constitutional law, with more than 36 years of forensic practice before the full hierarchy of courts in Portugal and Macau.',
        ],
      },
      {
        name: 'Patrick Mak & Tse Solicitors',
        location: 'Hong Kong · Central',
        summary: 'A Hong Kong–rooted, internationally minded full-service firm offering litigation and non-litigation counsel.',
        office: '9/F, Wing On Centre, 111 Connaught Road Central, Hong Kong',
        focus: ['Corporate Finance', 'Commercial & Civil Litigation', 'China-Appointed Attesting'],
        about: [
          'Patrick Mak & Tse Solicitors is a full-service Hong Kong law firm with an international outlook, providing a broad range of litigation and non-litigation services.',
          'Since its founding, the firm has built a strong track record in corporate finance, commercial and civil litigation, and China-appointed attesting officer services—serving clients with a practical approach, specialist legal knowledge, and deep industry experience.',
          'In 2024, Patrick Mak & Tse was named “Greater China Best Legal Counsel Service of the Year” in the MYTHFOCUS Asia Most Valuable Brand Awards—reflecting not only service that exceeds client expectations, but also the firm’s ability to anticipate and overcome commercial challenges, continually raise service quality, and contribute to the profession and society.',
          'Through ongoing client work, the firm has built strong relationships with regulators and with securities firms, investment banks, accounting firms, valuation firms, and peer law firms at home and abroad. Drawing on that network and its experience working with government and regulatory bodies, it coordinates resources to deliver efficient, high-quality counsel.',
        ],
      },
      {
        name: 'Prime Partners',
        location: 'Guangzhou · Zhujiang New Town',
        summary: 'A boutique firm focused on internet, AI, and the digital economy—rooted in South China, serving the Greater Bay Area and clients nationwide.',
        office: '17/F, Kaihua International Center, Zhujiang New Town, Tianhe, Guangzhou',
        focus: ['Internet', 'Artificial Intelligence', 'Digital Economy'],
        about: [
          'Guangdong Prime Partners (元数律师事务所) was founded in June 2026 by a group of like-minded lawyers. It is a boutique full-service firm focused on internet, artificial intelligence, and the digital economy.',
          'Its partners bring complementary backgrounds—including directors and deputy directors of provincial and municipal bar association committees on internet and intellectual property, as well as former legal heads from leading internet companies. That mix gives the firm industry insight, regulatory perspective, and commercial judgment from day one.',
          'Guided by the ethos of “法之元、理之数” (the origin of law, the logic of reason), Prime Partners has advised leading enterprises including ByteDance and Huawei. Based in South China, it serves the Greater Bay Area and clients across the country.',
        ],
      },
    ],
  },
}

export function getGcsaLegalCounsel(locale: GcsaLegalLocale) {
  return legalCounselCopy[locale]
}
