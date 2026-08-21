export const weatherList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '맨체스터', temp: 10, status: '비' },
  { id: 'city_05', name: '런던', temp: 21, status: '구름' },
  { id: 'city_06', name: '바르셀로나', temp: 34, status: '맑음' },
]

export const matchList = [
  {
    id: 'match_01',
    cityId: 'city_01',
    league: 'K리그',
    home: 'FC서울',
    away: '광주FC',
    time: '19:30',
    stadium: '서울월드컵경기장',
  },
  {
    id: 'match_02',
    cityId: 'city_02',
    league: 'K리그',
    home: '수원FC',
    away: '대전하나시티즌',
    time: '18:00',
    stadium: '수원종합운동장',
  },
  {
    id: 'match_03',
    cityId: 'city_03',
    league: 'K리그',
    home: '부산아이파크',
    away: '인천유나이티드',
    time: '19:00',
    stadium: '부산아시아드주경기장',
  },
  {
    id: 'match_04',
    cityId: 'city_04',
    league: '프리미어리그',
    home: '맨체스터 시티',
    away: '첼시',
    time: '20:00',
    stadium: '에티하드 스타디움',
  },
  {
    id: 'match_05',
    cityId: 'city_05',
    league: '프리미어리그',
    home: '아스널',
    away: '토트넘',
    time: '20:30',
    stadium: '에미레이츠 스타디움',
  },
  {
    id: 'match_06',
    cityId: 'city_06',
    league: '라리가',
    home: '바르셀로나',
    away: '레알 마드리드',
    time: '21:00',
    stadium: '캄 노우',
  },
]

export const getWeatherByCityId = (cityId) => weatherList.find((weather) => weather.id === cityId)
export const getMatchById = (matchId) => matchList.find((match) => match.id === matchId)

export const getViewingGuide = (weather) => {
  if (!weather)
    return { level: '정보 없음', className: 'unknown', message: '날씨 정보를 확인할 수 없습니다.' }
  if (weather.temp >= 33)
    return {
      level: '주의',
      className: 'danger',
      message: '물과 모자를 준비하고 충분히 수분을 섭취하세요.',
    }
  if (weather.status === '비')
    return { level: '주의', className: 'rain', message: '우산보다 관람에 편한 우비를 준비하세요.' }
  if (weather.temp <= 10)
    return { level: '보통', className: 'cold', message: '야간 기온에 대비해 겉옷을 준비하세요.' }
  return { level: '좋음', className: 'normal', message: '야외 관람하기 좋은 날씨입니다.' }
}
