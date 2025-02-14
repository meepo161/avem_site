import { ConfiguratorSteps } from '@/types/configurator';

export const configuratorSteps: ConfiguratorSteps = {
  initial: {
    id: 'initial',
    title: 'Выберите тип оборудования',
    description: 'С какого типа оборудования хотите начать?',
    options: [
      {
        id: 'measurement',
        name: 'Измерительные приборы',
        nextStep: 'measurementType'
      },
      {
        id: 'highVoltage',
        name: 'Высоковольтное оборудование',
        nextStep: 'voltageType'
      },
      {
        id: 'loadDevices',
        name: 'Нагрузочные устройства',
        nextStep: 'loadType'
      }
    ]
  },
  measurementType: {
    id: 'measurementType',
    title: 'Выберите тип измерений',
    description: 'Какие параметры необходимо измерять?',
    options: [
      {
        id: 'voltage',
        name: 'Измерение напряжения',
        productId: 'kvm'
      },
      {
        id: 'resistance',
        name: 'Измерение сопротивления',
        productId: 'ikas'
      }
    ]
  },
  voltageType: {
    id: 'voltageType',
    title: 'Выберите тип высоковольтного оборудования',
    description: 'Какой тип высоковольтного оборудования вам нужен?',
    options: [
      {
        id: 'testing',
        name: 'Испытательное оборудование',
        productId: 'viu'
      }
    ]
  },
  loadType: {
    id: 'loadType',
    title: 'Выберите тип нагрузочного устройства',
    description: 'Какой тип нагрузки вам необходим?',
    options: [
      {
        id: 'active',
        name: 'Активная нагрузка',
        productId: 'unm'
      }
    ]
  },
  voltage_devices: {
    title: "Выберите прибор для измерения напряжения",
    options: [
      { 
        id: "avem-3",
        name: "АВЭМ-3",
        productId: "avem-3"
      },
      { 
        id: "avem-4",
        name: "АВЭМ-4",
        productId: "avem-4"
      }
    ]
  },
  current_devices: {
    title: "Выберите прибор для измерения тока",
    options: [
      { 
        id: "avem-7",
        name: "Амперметр АВЭМ-7",
        productId: "avem-7"
      }
    ]
  },
  resistance_devices: {
    title: "Выберите прибор для измерения сопротивления",
    options: [
      { 
        id: "ikas-10",
        name: "Омметр ИКАС-10",
        productId: "ikas-10"
      },
      { 
        id: "avem-9",
        name: "Мегаомметр АВЭМ-9",
        productId: "avem-9"
      }
    ]
  },
  testing_type: {
    title: "Выберите тип испытаний",
    description: "Укажите, какой тип испытаний вам необходим",
    options: [
      { 
        id: "high_voltage",
        name: "Высоковольтные испытания",
        nextStep: "high_voltage_devices"
      },
      { 
        id: "diagnostic",
        name: "Диагностика вращающихся машин",
        nextStep: "diagnostic_devices"
      }
    ]
  }
}; 