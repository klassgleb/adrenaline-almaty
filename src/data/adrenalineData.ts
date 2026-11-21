export type Club = {
  id: string
  name: string
  address: string
  schedule: string
  area: string
  equipment: number
  lockers: number
  showers: number
  image: string
  description: string
  features: string[]
  prices: { daily: number; month: number; three: number; six: number; year: number }
}

export const clubs: Club[] = [
  { id:'shashkina', name:'На Шашкина', address:'Касымова 32', schedule:'Пн–Пт 06:00–23:00 · Сб 07:00–22:00 · Вс 09:00–21:00', area:'2000 м²', equipment:200, lockers:210, showers:15, image:'https://adrenaline.kz/storage/app/media/branches/shashkina/cropped-images/IMG_0893_jpg-9-297-790-911-1752572096.jpg', description:'Премиальный клуб с просторным тренажёрным залом, кардиозоной, студией Cycle, залом групповых программ и финской сауной.', features:['Студия Cycle','Групповые программы','Финская сауна','Фито-бар'], prices:{daily:28000,month:40000,three:90000,six:170000,year:240000}},
  { id:'arbate', name:'На Арбате', address:'Кунаева / Жибек Жолы 66', schedule:'Ежедневно · уточните часы на ресепшн', area:'2000 м²', equipment:170, lockers:200, showers:10, image:'https://adrenaline.kz/storage/app/media/branches/arabat/cropped-images/IMG_1151_jpg-3-383-797-620-1752554917.jpg', description:'Клуб премиум-класса с сайкл-студией, боксерской зоной, финской сауной, массажным кабинетом и косметологом.', features:['Сайкл-студия','Массаж','Косметолог','Парковка'], prices:{daily:25000,month:35000,three:85000,six:135000,year:220000}},
  { id:'abaya', name:'На Абая', address:'пр. Абая, Алматы', schedule:'Ежедневно · уточните часы на ресепшн', area:'1000 м²', equipment:120, lockers:160, showers:12, image:'https://adrenaline.kz/storage/app/media/branches/abaia/cropped-images/IMG_0404_jpg-3-247-797-823-1752562014.jpg', description:'Просторный зал с современными тренажёрами, финской сауной, фито-баром и бесплатной внутренней парковкой.', features:['Финская сауна','Фито-бар','Парковка','Кондиционирование'], prices:{daily:25000,month:35000,three:85000,six:135000,year:220000}},
  { id:'botanika', name:'На Ботанике', address:'Алматы · адрес филиала на Ботанике', schedule:'Ежедневно · уточните часы на ресепшн', area:'700 м²', equipment:80, lockers:150, showers:0, image:'https://adrenaline.kz/storage/app/media/branches/botanika/cropped-images/photo.webp', description:'Компактный клуб в центре города с тренажёрами нового поколения, залом групповых программ и фито-баром.', features:['Групповые занятия','Йога','Фито-бар','Новые тренажёры'], prices:{daily:25000,month:35000,three:85000,six:135000,year:220000}},
  { id:'dostyk', name:'На Достык', address:'Алматы · адрес филиала на Достык', schedule:'Ежедневно · уточните часы на ресепшн', area:'500 м²', equipment:50, lockers:100, showers:7, image:'https://adrenaline.kz/storage/app/media/branches/dostyk/cropped-images/DSCF0002-41-4-672-528-1752565515.jpg', description:'Современный компактный зал с полной линейкой профессионального оборудования, мужской и женской сауной.', features:['Мужская сауна','Женская сауна','Парковка','Фито-бар'], prices:{daily:25000,month:30000,three:65000,six:100000,year:185000}},
  { id:'kaldayakova', name:'На Калдаякова', address:'ул. Калдаякова, Алматы', schedule:'Ежедневно · уточните часы на ресепшн', area:'1600 м²', equipment:200, lockers:140, showers:10, image:'https://adrenaline.kz/storage/app/media/gallery/na-kaldayakova/1.webp', description:'Премиальный клуб 2026 года с залом групповых программ, финской сауной и бассейном 17 × 9 м с джакузи.', features:['Бассейн 17 × 9 м','Джакузи','Sauna','Групповые программы'], prices:{daily:0,month:50000,three:120000,six:190000,year:310000}},
  { id:'emtsova', name:'На Емцова', address:'ул. Емцова, Алматы', schedule:'Ежедневно · уточните часы на ресепшн', area:'800 м²', equipment:80, lockers:100, showers:6, image:'https://adrenaline.kz/storage/app/media/gallery/na-emsova/1.webp', description:'Светлое и комфортное пространство нового поколения с премиальным оборудованием и эффективной системой воздухообмена.', features:['Современное оборудование','Фито-бар','Вентиляция','Раздевалки'], prices:{daily:25000,month:30000,three:65000,six:100000,year:185000}},
  { id:'samal', name:'На Самале', address:'район Самал, Алматы', schedule:'Ежедневно · уточните часы на ресепшн', area:'1200 м²', equipment:200, lockers:210, showers:12, image:'https://adrenaline.kz/storage/app/media/gallery/na-samale/1.webp', description:'Просторный зал с премиальными тренажёрами Hoist, боевыми искусствами и широким залом групповых программ.', features:['Тренажёры Hoist','MMA / Бокс','Групповые занятия','Фито-бар'], prices:{daily:28000,month:40000,three:90000,six:170000,year:240000}},
]

export const trainers = [
  { name:'Анжела', role:'Стретчинг · хореография', image:'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=85' },
  { name:'Руслан', role:'MMA · боевые искусства', image:'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=900&q=85' },
  { name:'Салтанат', role:'Йога · осанка', image:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85' },
]

export const directions = [
  { title:'Силовой зал', text:'Премиальные тренажёры для всех групп мышц.', image:'https://adrenaline.kz/storage/app/media/branches/shashkina/cropped-images/IMG_0906_jpg-1-269-798-941-1752572109.jpg', className:'bento-large' },
  { title:'Кардио и Cycle', text:'Беговые дорожки, вело и динамичные сайкл-занятия.', image:'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85', className:'bento-small' },
  { title:'Групповые программы', text:'Йога, фитнес микс, стретчинг, танцы и full body.', image:'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85', className:'bento-small' },
  { title:'Бокс и MMA', text:'Работа с тенью, боксёрскими мешками и единоборства.', image:'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=85', className:'bento-wide' },
  { title:'SPA и восстановление', text:'Финская сауна и зоны полного восстановления.', image:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85', className:'bento-small' },
]
