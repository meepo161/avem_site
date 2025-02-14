export interface ConfiguratorOption {
  id: string;
  name: string;
  nextStep?: string;
  productId?: string;
}

export interface ConfiguratorStep {
  title: string;
  description?: string;
  options: ConfiguratorOption[];
} 