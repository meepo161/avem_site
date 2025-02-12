import { ConfiguratorStep } from '../types';

export const configuratorSteps: ConfiguratorStep[] = [
  {
    title: "Тип оборудования",
    options: [
      {
        label: "Испытательные стенды",
        nextStep: [
          {
            title: "Выберите тип стенда",
            options: [
              {
                label: "Стенд для испытания электрических машин",
                productId: "kspem"
              },
              {
                label: "Стенд для испытания асинхронных двигателей",
                productId: "kspad"
              }
            ]
          }
        ]
      },
      {
        label: "Высоковольтные установки",
        nextStep: [
          {
            title: "Выберите тип установки",
            options: [
              {
                label: "ВИУ-100Р",
                productId: "viu-100r"
              }
            ]
          }
        ]
      }
    ]
  }
]; 