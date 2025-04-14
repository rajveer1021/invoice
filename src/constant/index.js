import BarChartIcon from "@mui/icons-material/BarChart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import DescriptionIcon from "@mui/icons-material/Description";
import DynamicFormSectionCreateClient from "../components/internal/DynamicFormSectionCreateClient";
import { Email as EmailIcon } from '@mui/icons-material';

// export const BASE_URL = "https://api.invoicean.com/api/v1";
export const BASE_URL = "http://192.168.1.66:8080/api/v1";

export const GOOGLE_RECAPTCHA_SITEKEY =
  "6LcFcrUpAAAAAGQeHVvJW4vdrgZPEAuv1_WEomVF";
export const GOOGLE_AUTH_TOKEN =
  "434265883340-gaspoad6fql96je10sfv351kbjf1cjsd.apps.googleusercontent.com";
export const FACEBOOK_AUTH_TOKEN = "961408218254851";
export const REDIRECT_URL = `https://invoicean.com/login`;

export const AddreportLinks = [
  { title: "Client", url: "/clients/add-client" },
  { title: "Invoice", url: "/invoices/create-invoice" },
];
export const Reports = [
  { id: "received_invoices", name: "Invoices ( paid )" },
  { id: "non_received_invoices", name: "Invoices ( unpaid )" },
];

export const initialValuesForLogin = {
  email: "",
  password: "",
};
export const initialValuesForDeleteAccount = {
  confirm_password: "",
};

export const initialValuesForEmail = {
  email: "",
};
export const initialValuesForRegistrationPage = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export const initialValuesForOTPScreen = {
  otp_code: "",
};
export const initialValuesForUpdatePassword = {
  password: "",
  password_confirmation: "",
};

export const initialValuesForAccountInfo = {
  account_holder_name: "",
  account_no: "",
  bank_name: "",
  ifsc_code: "",
  signature: "",
};
export const initialValuesForAddclient = {
  company_name: "",
  website_url: "",
  first_name: "",
  last_name: "",
  email: "",
  address1: "",
  address2: "",
  postel_code: "",
  state: "",
  city: "",
  country: "",
  phone_no: "",
  fax_no: "",
  gstin_no: "",
  customFields: [{ name: "", value: "" }],
};

export const initialValuesForChangePassword = {
  current_password: "",
  password: "",
  password_confirmation: "",
};

export const initialValuesForFeedback = {
  first_name: "",
  last_name: "",
  email: "",
  description: "",
  job_title: "",
};

export const columnsForInvoice = [
  {
    field: "date",
    headerName: "Date",
    sortable: false,
  },
  {
    field: "invoice_number",
    headerName: "Invoice Number",
    sortable: false,
  },
  {
    field: "client_name",
    headerName: "Client Name",
    sortable: false,
  },
  {
    field: "total",
    headerName: "Outstanding amount",
    sortable: false,
  },
  {
    field: "due_date",
    headerName: "Due Date",
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",

    sortable: false,
  },

  {
    field: "edit",
    headerName: "",
    sortable: false,
  },
];

export const columnsClients = [
  {
    field: "name",
    headerName: "Client Name",

    width: 400,
    sortable: false,
  },
  {
    field: "total_invoice_bill",
    headerName: "Total Invoice",

    width: 100,
    align: "center",
    sortable: false,
  },
  {
    field: "total_amount",
    headerName: "Total amount",

    width: 100,
    sortable: false,
  },
  {
    field: "outstanding_amount",
    headerName: "Outstanding amount",

    width: 100,
    sortable: false,
  },
  {
    field: "contact_number",
    headerName: "Contact Number",
    width: 100,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",

    width: 100,
    sortable: false,
  },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    width: 50,
  },
];
export const columnsForClients = [
  {
    field: "name",
    headerName: "Invoice Number",

    width: 400,
    sortable: false,
  },
  {
    field: "date",
    headerName: "Date",

    width: 100,
    align: "center",
    sortable: false,
  },
  {
    field: "tax",
    headerName: "Tax",
    width: 100,
    sortable: false,
  },
  {
    field: "total",
    headerName: "Total amount",

    width: 100,
    sortable: false,
  },
  {
    field: "outstanding_amount",
    headerName: "Outstanding amount",

    width: 100,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",

    width: 100,
    sortable: false,
  },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    width: 50,
  },
];

export const columnsForAllInvoicereport = [
  {
    field: "date_issued",
    headerName: "Date issued",
    width: 100,
    align: "center",
    sortable: false,
  },
  {
    field: "client_name",
    headerName: "Client",
    width: 400,
    sortable: false,
  },

  {
    field: "invoice_date",
    headerName: "Invoice date",
    width: 100,
    sortable: false,
  },
  {
    field: "due_date",
    headerName: "Due date",
    width: 100,
    sortable: false,
  },
  {
    field: "paid_date",
    headerName: "Paid date",

    width: 100,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    sortable: false,
  },

  {
    field: "edit",
    headerName: "",
    sortable: false,
    width: 50,
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const servicesData = [
  {
    icon: <DescriptionIcon sx={{ fontSize: "2.2rem" }} />,
    heading: "Effortless Invoice Creation and Management",
    subheading:
      "Create professional invoices in minutes! With Invoicean, you can easily generate custom invoices tailored to your business needs. Add your logo, customize fields, and personalize invoices to reflect your brand identity. Whether you're billing for products or services, Invoicean has you covered.",
  },
  {
    icon: <ShareIcon sx={{ fontSize: "2.2rem" }} />,
    heading: "Send Invoices to your clients with Ease",
    subheading:
      "Once your invoice is ready, sending it to clients is just a click away. With Invoicean, you can effortlessly email invoices directly to your clients, saving time and ensuring prompt delivery. Keep track of sent invoices and manage payment statuses with real-time updates.",
  },
  {
    icon: <FolderCopyIcon sx={{ fontSize: "2.2rem" }} />,
    heading: "Comprehensive Reporting Capabilities",
    subheading:
      "Stay on top of your finances with Invoicean's comprehensive reporting features. Access detailed reports of all your invoices at your fingertips. With our downloadable reports, you can analyze your financial data, track payments, and make informed decisions to drive your business forward.",
  },
  {
    icon: <BarChartIcon sx={{ fontSize: "2.2rem" }} />,
    heading: "Insightful Dashboard with Graphical Representation",
    subheading:
      "Visualize your business's financial health with our dynamic dashboard. Track key metrics, monitor payment statuses, and gain valuable insights with graphical representations of your invoicing data. Our dashboard provides a clear overview of your business performance, empowering you to make informed decisions with confidence.",
  },
  {
    icon: <PictureAsPdfIcon sx={{ fontSize: "2.2rem" }} />,
    heading: "Downloadable Invoices in PDF Format",
    subheading:
      "Need a printable version of your invoice? Invoicean offers the option to download invoices in PDF format. Easily save or print invoices for your records or share them with clients, ensuring clarity and professionalism in your financial interactions.",
  },
  {
    icon: <FileDownloadIcon sx={{ fontSize: "2.2rem" }} />,
    heading: "Downloadable Invoices Reports in CSV Format",
    subheading:
      "Take control of your data! Export your invoice data in CSV format with Invoicean, facilitating easy manipulation and compatibility with spreadsheet software. Seamlessly integrate your invoicing information with other tools for a more cohesive and streamlined financial management process.",
  },
];

export const footerLinksGeneral = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/invoicean-tour", label: "Take a tour of Invoicean" },
  { path: "/aboutus", label: "About Invoicean" },
  { path: "/feedback", label: "Share your feedback" },
  { path: "/contact", label: "Contact with us" },
];
export const footerLinksLegal = [
  { path: "/legal/terms-and-conditions", label: "Terms & Conditions" },
  { path: "/legal/privacy-policy", label: "Privacy Policy" },
  { path: "/legal/cookies-policy", label: "Cookie Policy" },
];

export const testimonialData = [
  {
    name: "Sarah Johnson",
    testimonial:
      "Invoicean makes creating invoices a breeze! It's intuitive and user-friendly, saving me time and hassle.",
    position: "Freelance Graphic Designer",
  },
  {
    name: "Mark Thompson",
    testimonial:
      "Sending invoices with Invoicean is effortless. It streamlines the entire process, allowing me to focus more on my business.",
    position: "Small Business Owner",
  },
  {
    name: "Emily Chen",
    testimonial:
      "Invoicean's product sharing feature has transformed how I collaborate with clients. Sharing files and documents has never been easier!",
    position: "Marketing Consultant",
  },
  {
    name: "John Reynolds",
    testimonial:
      "As a freelancer, Invoicean has been a game-changer for me. The ability to create and send invoices on the go has greatly improved my workflow.",
    position: "Freelance Writer",
  },
  {
    name: "Maria Rodriguez",
    testimonial:
      "Invoicean simplifies the entire invoicing process. It's easy to use and helps me keep track of all my transactions efficiently.",
    position: "Small Business Owner",
  },
  {
    name: "Michael Nguyen",
    testimonial:
      "I highly recommend Invoicean to fellow entrepreneurs. It's a reliable tool for creating professional invoices and managing payments seamlessly.",
    position: "Startup Founder",
  },
  {
    name: "Jessica Carter",
    testimonial:
      "Invoicean's product sharing feature has revolutionized how I collaborate with my team. Sharing documents and updates has never been smoother.",
    position: "Project Manager",
  },
  {
    name: "David Miller",
    testimonial:
      "Sending invoices with Invoicean has simplified my billing process. It's straightforward and saves me a lot of time each month.",
    position: "Freelance Web Developer",
  },
  {
    name: "Rachel Evans",
    testimonial:
      "Invoicean is my go-to tool for invoicing. It's user-friendly, efficient, and helps me maintain a professional image with my clients.",
    position: "Independent Consultant",
  },
  {
    name: "Alex Foster",
    testimonial:
      "Sharing product updates and files with clients is a breeze with Invoicean. It's a reliable platform that enhances collaboration and communication.",
    position: "Product Manager",
  },
];

export const unregisteredlinks = [
  { to: "/forgot-password", text: "Forgot your password?" },
  { to: "/confirm-account", text: "Need assistance confirming your account?" },
];

export const invoiceUnit = [
  { value: "Unit", label: "unit" },
  { value: "piece", label: "pc" },
  { value: "lb", label: "lb." },
  { value: "ft", label: "ft" },
  { value: "hrs", label: "hrs" },
  { value: "day", label: "d" },
  { value: "month", label: "m" },
  { value: "year", label: "y" },
  { value: "gram", label: "g" },
  { value: "kg", label: "kg" },
  { value: "custom", label: "Custom" },
];

export const dueDates = [
  { value: "7", label: "After 7 Days" },
  { value: "15", label: "After 15 Days" },
  { value: "30", label: "After 30 Days" },
]

export const BusinessInfo = (values) => {
  const businessInfoFields = [
    {
      id: "phone_no",
      name: "phone_no",
      label: "Phone number",
      value: values.phone_no,
    },
    {
      id: "fax_no",
      name: "fax_no",
      label: "Fax number",
      value: values.fax_no,
    },
    {
      id: "gstin_no",
      name: "gstin_no",
      label: "Tax identification number",
      value: values.gstin_no,
    },
  ];

  return (
    <DynamicFormSectionCreateClient
      sectionTitle="Contact and Business Information"
      fields={businessInfoFields}
    />
  );
};

export const Address = (values) => {
  const addressFields = [
    {
      id: "address1",
      name: "address1",
      label: "Address1",
      value: values.address1,
    },
    {
      id: "address2",
      name: "address2",
      label: "Address2",
      value: values.address2,
    },
    { id: "city", name: "city", label: "City", value: values.city },
    {
      id: "postel_code",
      name: "postel_code",
      label: "Postal code",
      value: values.postel_code,
    },
    { id: "state", name: "state", label: "State", value: values.state },

    {
      id: "country",
      name: "country",
      label: "Country",
      value: values.country,
    },
  ];

  return (
    <DynamicFormSectionCreateClient
      sectionTitle="Office Address"
      fields={addressFields}
    />
  );
};

export const BasicInfo = (values) => {
  const basicInfoFields = [
    {
      id: "company_name",
      name: "company_name",
      label: "Company Name",
      value: values.company_name,
    },
    { id: "email", name: "email", label: "Email", value: values.email },
  ];

  return (
    <DynamicFormSectionCreateClient
      sectionTitle="Basic Information"
      fields={basicInfoFields}
    />
  );
};

export const topEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "aol.com",
  "live.com",
  "rediff.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "mail.com",
  "zoho.com",
  "protonmail.com",
  "gmx.com",
  "yandex.com",
  "inbox.com",
  "lavabit.com",
  "tutanota.com",
  "hushmail.com",
  "fastmail.com",
  "msn.com",
  "comcast.net",
  "verizon.net",
  "att.net",
  "cox.net",
  "btinternet.com",
  "sky.com",
  "libero.it",
  "virgilio.it",
  "sfr.fr",
  "orange.fr",
  "web.de",
  "freenet.de",
  "gmx.net",
  "t-online.de",
];

export const steps = [
  {
    element: "#dashboard",
    popover: {
      title: "Dashboard",
      description:
        "The dashboard serves as the homepage, offering project overviews and graphical representations of invoices, clients, and financial details.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#invoices",
    popover: {
      title: "Invoices",
      description:
        "The Invoice page offers full control to create and manage invoices and their statuses efficiently.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#reports",
    popover: {
      title: "Reports",
      description:
        "The Report page includes a filter that enables us to generate reports based on specific requirements.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#clients",
    popover: {
      title: "Clients",
      description:
        "The Clients page provides access to create new clients and edit existing ones for improved usability.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#accounts",
    popover: {
      title: "Accounts",
      description:
        "The account page provides access to update our own details for improved usability.",
      side: "left",
      align: "start",
    },
  },

  {
    element: "#createClient",
    popover: {
      title: "Create Client",
      description:
        "Click the Client button to add a new client by entering the required details.",
      side: "right",
      align: "start",
    },
  },
  {
    element: "#createInvoice",
    popover: {
      title: "Create Invoice",
      description:
        "Click the Invoice button to add a new invoice for client by entering the required details.",
      side: "right",
      align: "start",
    },
  },
];
export const currencies = [
  { code: "USD", label: "United States Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "AUD", label: "Australian Dollar" },
  { code: "CAD", label: "Canadian Dollar" },
  { code: "CHF", label: "Swiss Franc" },
  { code: "CZK", label: "Czech Koruna" },
  { code: "DKK", label: "Danish Krone" },
  { code: "HKD", label: "Hong Kong Dollar" },
  { code: "HUF", label: "Hungarian Forint" },
  { code: "ILS", label: "Israeli New Sheqel" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "MXN", label: "Mexican Peso" },
  { code: "NOK", label: "Norwegian Krone" },
  { code: "NZD", label: "New Zealand Dollar" },
  { code: "PLN", label: "Polish Złoty" },
  { code: "SEK", label: "Swedish Krona" },
  { code: "SGD", label: "Singapore Dollar" },
  { code: "AFN", label: "Afghan Afghani" },
  { code: "ALL", label: "Albanian Lek" },
  { code: "DZD", label: "Algerian Dinar" },
  { code: "AOA", label: "Angolan Kwanza" },
  { code: "ARS", label: "Argentine Peso" },
  { code: "AMD", label: "Armenian Dram" },
  { code: "AWG", label: "Aruban Florin" },
  { code: "AZN", label: "Azerbaijani Manat" },
  { code: "BSD", label: "Bahamian Dollar" },
  { code: "BHD", label: "Bahraini Dinar" },
  { code: "BDT", label: "Bangladeshi Taka" },
  { code: "BBD", label: "Barbadian Dollar" },
  { code: "BYR", label: "Belarusian Ruble" },
  { code: "BZD", label: "Belize Dollar" },
  { code: "BMD", label: "Bermudian Dollar" },
  { code: "BTN", label: "Bhutanese Ngultrum" },
  { code: "BOB", label: "Bolivian Boliviano" },
  { code: "BAM", label: "Bosnia and Herzegovina Convertible Mark" },
  { code: "BWP", label: "Botswana Pula" },
  { code: "BRL", label: "Brazilian Real" },
  { code: "BND", label: "Brunei Dollar" },
  { code: "BGN", label: "Bulgarian Lev" },
  { code: "BIF", label: "Burundian Franc" },
  { code: "KHR", label: "Cambodian Riel" },
  { code: "CVE", label: "Cape Verdean Escudo" },
  { code: "KYD", label: "Cayman Islands Dollar" },
  { code: "XAF", label: "Central African Cfa Franc" },
  { code: "XPF", label: "Cfp Franc" },
  { code: "CLP", label: "Chilean Peso" },
  { code: "CNY", label: "Chinese Renminbi Yuan" },
  { code: "COP", label: "Colombian Peso" },
  { code: "KMF", label: "Comorian Franc" },
  { code: "CDF", label: "Congolese Franc" },
  { code: "CRC", label: "Costa Rican Colón" },
  { code: "HRK", label: "Croatian Kuna" },
  { code: "CUC", label: "Cuban Convertible Peso" },
  { code: "CUP", label: "Cuban Peso" },
  { code: "DJF", label: "Djiboutian Franc" },
  { code: "DOP", label: "Dominican Peso" },
  { code: "XCD", label: "East Caribbean Dollar" },
  { code: "EGP", label: "Egyptian Pound" },
  { code: "ERN", label: "Eritrean Nakfa" },
  { code: "EEK", label: "Estonian Kroon" },
  { code: "ETB", label: "Ethiopian Birr" },
  { code: "FKP", label: "Falkland Pound" },
  { code: "FJD", label: "Fijian Dollar" },
  { code: "GMD", label: "Gambian Dalasi" },
  { code: "GEL", label: "Georgian Lari" },
  { code: "GHS", label: "Ghanaian Cedi" },
  { code: "GIP", label: "Gibraltar Pound" },
  { code: "GTQ", label: "Guatemalan Quetzal" },
  { code: "GNF", label: "Guinean Franc" },
  { code: "GYD", label: "Guyanese Dollar" },
  { code: "HTG", label: "Haitian Gourde" },
  { code: "HNL", label: "Honduran Lempira" },
  { code: "ISK", label: "Icelandic Króna" },
  { code: "INR", label: "Indian Rupee" },
  { code: "IDR", label: "Indonesian Rupiah" },
  { code: "IRR", label: "Iranian Rial" },
  { code: "IQD", label: "Iraqi Dinar" },
  { code: "JMD", label: "Jamaican Dollar" },
  { code: "JOD", label: "Jordanian Dinar" },
  { code: "KZT", label: "Kazakhstani Tenge" },
  { code: "KES", label: "Kenyan Shilling" },
  { code: "KWD", label: "Kuwaiti Dinar" },
  { code: "KGS", label: "Kyrgyzstani Som" },
  { code: "LAK", label: "Lao Kip" },
  { code: "LVL", label: "Latvian Lats" },
  { code: "LBP", label: "Lebanese Pound" },
  { code: "LSL", label: "Lesotho Loti" },
  { code: "LRD", label: "Liberian Dollar" },
  { code: "ZAR", label: "South African Rand" },
  { code: "MYR", label: "Malaysian Ringgit" },
  { code: "LYD", label: "Libyan Dinar" },
  { code: "LTL", label: "Lithuanian Litas" },
  { code: "MOP", label: "Macanese Pataca" },
  { code: "MKD", label: "Macedonian Denar" },
  { code: "MGA", label: "Malagasy Ariary" },
  { code: "MWK", label: "Malawian Kwacha" },
  { code: "MVR", label: "Maldivian Rufiyaa" },
  { code: "MRO", label: "Mauritanian Ouguiya" },
  { code: "MUR", label: "Mauritian Rupee" },
  { code: "MDL", label: "Moldovan Leu" },
  { code: "MNT", label: "Mongolian Tögrög" },
  { code: "MAD", label: "Moroccan Dirham" },
  { code: "MZN", label: "Mozambican Metical" },
  { code: "MMK", label: "Myanmar Kyat" },
  { code: "NAD", label: "Namibian Dollar" },
  { code: "NPR", label: "Nepalese Rupee" },
  { code: "ANG", label: "Netherlands Antillean Gulden" },
  { code: "TWD", label: "New Taiwan Dollar" },
  { code: "NIO", label: "Nicaraguan Córdoba" },
  { code: "NGN", label: "Nigerian Naira" },
  { code: "KPW", label: "North Korean Won" },
  { code: "OMR", label: "Omani Rial" },
  { code: "PKR", label: "Pakistani Rupee" },
  { code: "PAB", label: "Panamanian Balboa" },
  { code: "PGK", label: "Papua New Guinean Kina" },
  { code: "PYG", label: "Paraguayan Guaraní" },
  { code: "PEN", label: "Peruvian Nuevo Sol" },
  { code: "PHP", label: "Philippine Peso" },
  { code: "QAR", label: "Qatari Riyal" },
  { code: "RON", label: "Romanian Leu" },
  { code: "RUB", label: "Russian Ruble" },
  { code: "RWF", label: "Rwandan Franc" },
  { code: "SHP", label: "Saint Helenian Pound" },
  { code: "SVC", label: "Salvadoran Colón" },
  { code: "WST", label: "Samoan Tala" },
  { code: "STD", label: "São Tomé and Príncipe Dobra" },
  { code: "SAR", label: "Saudi Riyal" },
  { code: "RSD", label: "Serbian Dinar" },
  { code: "SCR", label: "Seychellois Rupee" },
  { code: "SLL", label: "Sierra Leonean Leone" },
  { code: "SKK", label: "Slovak Koruna" },
  { code: "SBD", label: "Solomon Islands Dollar" },
  { code: "SOS", label: "Somali Shilling" },
  { code: "KRW", label: "South Korean Won" },
  { code: "LKR", label: "Sri Lankan Rupee" },
  { code: "SDG", label: "Sudanese Pound" },
  { code: "SRD", label: "Surinamese Dollar" },
  { code: "SZL", label: "Swazi Lilangeni" },
  { code: "SYP", label: "Syrian Pound" },
  { code: "TJS", label: "Tajikistani Somoni" },
  { code: "TZS", label: "Tanzanian Shilling" },
  { code: "THB", label: "Thai Baht" },
  { code: "TOP", label: "Tongan Paʻanga" },
  { code: "TTD", label: "Trinidad and Tobago Dollar" },
  { code: "TND", label: "Tunisian Dinar" },
  { code: "TRY", label: "Turkish Lira" },
  { code: "TMM", label: "Turkmenistani Manat" },
  { code: "UGX", label: "Ugandan Shilling" },
  { code: "UAH", label: "Ukrainian Hryvnia" },
  { code: "AED", label: "United Arab Emirates Dirham" },
  { code: "UYU", label: "Uruguayan Peso" },
  { code: "UZS", label: "Uzbekistani Som" },
  { code: "VUV", label: "Vanuatu Vatu" },
  { code: "VEF", label: "Venezuelan Bolívar" },
  { code: "VND", label: "Vietnamese Đồng" },
  { code: "XOF", label: "West African Cfa Franc" },
  { code: "YER", label: "Yemeni Rial" },
  { code: "ZMK", label: "Zambian Kwacha" },
  { code: "ZWD", label: "Zimbabwean Dollar" },
];

export const Bargraph = {
  categories: ["1 to 7", "8 to 14", "15 to 21", "22 to 28", "29 to 31"],
  series: [
    { name: "total", data: ["1271748.28", "1656.93"] },
    { name: "Paid", data: ["1242826.2"] },
  ],
};

// Theme colours
export const THEME_COLORS = {
  primary: '#2196F3',
  primaryLight: '#E3F2FD',
  secondary: '#50B077',
  secondaryLight: '#E8F5E9',
  tertiary: '#9E9E9E',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  text: '#333333',
  green: '#50B077',
};

// Plan Theme colours
export const PLAN_THEME_COLORS = {
  primary: '#4A6CFA',
  primaryLight: '#F0F5FF',
  secondary: '#50B077',
  secondaryLight: '#ECFBF3',
  tertiary: '#64748B',
  tertiaryLight: '#F8FAFC',
  white: '#FFFFFF',
  lightGray: '#F1F5F9',
  darkGray: '#334155',
  text: '#1E293B',
  green: '#22C55E',
  blue: '#4A6CFA',
  blueLight: '#F0F5FF',
  border: '#E2E8F0',
  danger: '#EF4444',
  warning: '#F59E0B',
  warningLight: '#FFF7ED'
};


// Trail Page
export const TRIAL_FEATURES = [
  {
    icon: <DescriptionIcon fontSize="small" sx={{ color: '#4a7dff' }} />,
    content: 'Effortless Invoice Creation and Management'
  },
  {
    icon: <EmailIcon fontSize="small" sx={{ color: '#4a7dff' }} />,
    content: 'Send Invoices to your clients with Ease'
  },
  {
    icon: <BarChartIcon fontSize="small" sx={{ color: '#4a7dff' }} />,
    content: 'Comprehensive Reporting Capabilities'
  },
  {
    icon: <PictureAsPdfIcon fontSize="small" sx={{ color: '#4a7dff' }} />,
    content: 'Downloadable Invoices in PDF Format'
  }
];