import cover from './assets/demo-case/cover.png'
import before from './assets/demo-case/01-before.png'
import marking from './assets/demo-case/02-marking.png'
import routing from './assets/demo-case/03-routing.png'
import boxes from './assets/demo-case/04-boxes.png'
import panel from './assets/demo-case/05-panel.png'
import kitchen from './assets/demo-case/06-kitchen.png'
import lighting from './assets/demo-case/07-lighting.png'
import finish from './assets/demo-case/08-finish.png'

export type CasePhoto = { src: string; title: string; alt: string }
export type EstimateRow = { group: 'Работы' | 'Материалы'; title: string; amount: number; unit: string; unitPrice: number }
export type CaseStudy = {
  number: string
  status: 'demo' | 'placeholder'
  title: string
  task: string
  cover?: string
  coverAlt?: string
  facts: { label: string; value: string }[]
  problem: string
  solution: string
  result: string
  gallery: CasePhoto[]
  estimate: EstimateRow[]
}

const demoCase: CaseStudy = {
  number: '01',
  status: 'demo',
  title: 'Электропроводка квартиры с нуля под ключ',
  task: 'Пример полного цикла: планирование линий, прокладка кабеля, сборка щита, розетки и освещение в квартире.',
  cover,
  coverAlt: 'Сгенерированный пример интерьера после электромонтажа: кухня-гостиная, розетки и трековое освещение',
  facts: [
    { label: 'Тип объекта', value: 'Квартира · 65 м²' },
    { label: 'Формат', value: 'Электрика с нуля' },
    { label: 'Материалы', value: '8 визуализаций' },
  ],
  problem: 'Представим квартиру на стадии ремонта: нужно заново продумать силовые линии, розетки, выключатели, освещение и место для квартирного щита. Задача — сделать схему понятной для будущей кухни и жилых комнат.',
  solution: 'В демонстрационном сценарии сначала размечаем точки и трассы, затем прокладываем кабели, подготавливаем подрозетники и собираем щит по группам. После чистовой отделки устанавливаем механизмы и светильники, проверяем линии.',
  result: 'Показан образец того, как на странице кейса можно связать исходную задачу, техническое решение, этапы монтажа, фотографии и смету. Это не отчёт о выполненной работе — изображения и расчёт созданы для демонстрации формата.',
  gallery: [
    { src: before, title: '01 / Исходное помещение', alt: 'Сгенерированный пример пустой квартиры до начала электромонтажа' },
    { src: marking, title: '02 / Разметка точек', alt: 'Сгенерированный пример разметки будущих розеток и кабельных трасс' },
    { src: routing, title: '03 / Прокладка трасс', alt: 'Сгенерированный пример кабельных трасс в стене' },
    { src: boxes, title: '04 / Подрозетники', alt: 'Сгенерированный пример монтажа подрозетников и защитных труб' },
    { src: panel, title: '05 / Квартирный щит', alt: 'Сгенерированный пример собранного распределительного щита' },
    { src: kitchen, title: '06 / Розетки кухни', alt: 'Сгенерированный пример размещения розеток на кухне' },
    { src: lighting, title: '07 / Освещение', alt: 'Сгенерированный пример трекового освещения и выключателей' },
    { src: finish, title: '08 / Готовый интерьер', alt: 'Сгенерированный пример квартиры после завершения электромонтажа' },
  ],
  estimate: [
    { group: 'Работы', title: 'Схема и разметка точек', amount: 1, unit: 'компл.', unitPrice: 12000 },
    { group: 'Работы', title: 'Подготовка кабельных трасс', amount: 85, unit: 'м', unitPrice: 380 },
    { group: 'Работы', title: 'Прокладка кабеля', amount: 210, unit: 'м', unitPrice: 260 },
    { group: 'Работы', title: 'Установка подрозетников', amount: 42, unit: 'шт.', unitPrice: 450 },
    { group: 'Работы', title: 'Сборка квартирного щита', amount: 1, unit: 'компл.', unitPrice: 28000 },
    { group: 'Работы', title: 'Установка розеток и выключателей', amount: 42, unit: 'шт.', unitPrice: 650 },
    { group: 'Работы', title: 'Подключение световых точек', amount: 16, unit: 'шт.', unitPrice: 850 },
    { group: 'Материалы', title: 'Кабель и расходные материалы', amount: 1, unit: 'компл.', unitPrice: 44500 },
    { group: 'Материалы', title: 'Оборудование щита', amount: 1, unit: 'компл.', unitPrice: 38000 },
    { group: 'Материалы', title: 'Розетки и выключатели', amount: 1, unit: 'компл.', unitPrice: 29000 },
  ],
}

// Empty records share the same page structure: replace copy, images and estimate after approval.
const placeholders: CaseStudy[] = Array.from({ length: 11 }, (_, index) => ({
  number: String(index + 2).padStart(2, '0'),
  status: 'placeholder',
  title: `Направление работ ${String(index + 2).padStart(2, '0')}`,
  task: 'Название, описание и материалы будут добавлены после согласования с заказчиком.',
  facts: [], problem: '', solution: '', result: '', gallery: [], estimate: [],
}))

export const caseStudies: CaseStudy[] = [demoCase, ...placeholders]
