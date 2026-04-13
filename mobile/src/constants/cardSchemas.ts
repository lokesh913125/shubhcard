export const FORM_SCHEMAS: any = {
  biodata: [
    { id: 'photo', title: '📸 फोटो', removable: true, type: 'photo' },
    { id: 'personal', title: '👤 व्यक्तिगत जानकारी', removable: false, fields: [
      { name: 'name', label: 'नाम / Name', type: 'text', removable: false },
      { name: 'dob', label: 'जन्म तिथि', type: 'date', removable: true },
      { name: 'birthtime', label: 'जन्म समय', type: 'time', removable: true },
      { name: 'birthplace', label: 'जन्म स्थान', type: 'text', removable: true },
      { name: 'rashi', label: 'राशि', type: 'select', options: ['','मेष','वृषभ','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुंभ','मीन'], removable: true },
      { name: 'height', label: 'कद / Height', type: 'text', placeholder: '5\'7"', removable: true },
      { name: 'caste', label: 'जाति / समाज', type: 'text', removable: true }
    ]},
    { id: 'education', title: '🎓 शिक्षा व पेशा', removable: true, fields: [
      { name: 'education', label: 'उच्च शिक्षा', type: 'text', placeholder: 'B.Tech, MBA', removable: true },
      { name: 'occupation', label: 'व्यवसाय', type: 'text', removable: true },
      { name: 'income', label: 'वार्षिक आय', type: 'text', removable: true }
    ]},
    { id: 'family', title: '👨‍👩‍👧 पारिवारिक जानकारी', removable: true, fields: [
      { name: 'father', label: 'पिता का नाम', type: 'text', removable: true },
      { name: 'mother', label: 'माता का नाम', type: 'text', removable: true },
    ]},
    { id: 'contact', title: '📞 संपर्क', removable: true, fields: [
      { name: 'mobile', label: 'मोबाइल नंबर', type: 'tel', removable: true },
      { name: 'address', label: 'पूरा पता', type: 'textarea', removable: true }
    ]}
  ],
  shadicard: [
    { id: 'couple', title: '💑 वर-वधू', removable: false, fields: [
      { name: 'groomName', label: 'वर का नाम', type: 'text', removable: false },
      { name: 'brideName', label: 'वधू का नाम', type: 'text', removable: false },
    ]},
    { id: 'event', title: '📅 कार्यक्रम', removable: false, fields: [
      { name: 'weddingDate', label: 'विवाह तिथि', type: 'date', removable: false },
      { name: 'venue', label: 'विवाह स्थल', type: 'text', removable: true },
    ]},
  ],
  // Other schemas can be added similarly...
};
