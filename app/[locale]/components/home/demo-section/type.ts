export type PlanningDemoFieldType = 'text' | 'email' | 'tel';

export type PlanningDemoField = {
  id: string;
  name: string;
  label: string;
  type?: PlanningDemoFieldType;
  placeholder?: string;
};

export type PlanningDemoSectionModel = {
  blockType: 'PlanningDemoSection';
  heading: string;
  image: {
    placeholderLabel: string;
  };
  form: {
    fields: PlanningDemoField[];
    country: {
      label: string;
      placeholder: string;
    };
    submitButton: {
      label: string;
    };
  };
};
