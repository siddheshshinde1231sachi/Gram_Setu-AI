import { z } from "zod";

export const RoleEnum = z.enum(["CITIZEN", "MODERATOR", "VILLAGE_ADMIN", "SUPER_ADMIN"]);
export const VerificationStatusEnum = z.enum(["OFFICIAL_SOURCE", "GOVERNMENT_DOCUMENT", "COMMUNITY_PENDING", "UNAVAILABLE"]);
export const WorkStatusEnum = z.enum(["PROPOSED", "APPROVED", "SANCTIONED", "WORK_STARTED", "IN_PROGRESS", "INSPECTION", "COMPLETED"]);
export const ComplaintStatusEnum = z.enum(["SUBMITTED", "UNDER_REVIEW", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "REJECTED"]);
export const QuestionStatusEnum = z.enum(["SUBMITTED", "UNDER_REVIEW", "ANSWERED", "CLOSED"]);

export const VillageSchema = z.object({
  name: z.string().min(2, "गाव नाव किमान २ अक्षरे असावे"),
  nameMr: z.string().min(2, "मराठी नाव आवश्यक आहे"),
  nameHi: z.string().optional(),
  state: z.string().default("Maharashtra"),
  district: z.string().min(2, "जिल्हा नाव आवश्यक"),
  taluka: z.string().min(2, "तालुका नाव आवश्यक"),
  pinCode: z.string().regex(/^\d{6}$/, "६ अंकी पिन कोड आवश्यक"),
  population: z.number().int().positive(),
  households: z.number().int().positive(),
  area: z.number().positive(),
  latitude: z.number(),
  longitude: z.number(),
});

export const WorkSchema = z.object({
  villageId: z.string().uuid(),
  workId: z.string().min(3),
  title: z.string().min(5, "कामाचे नाव किमान ५ अक्षरांचे असावे"),
  titleMr: z.string().optional(),
  description: z.string().min(10, "सविस्तर माहिती किमान १० अक्षरे असावी"),
  category: z.string(),
  department: z.string(),
  scheme: z.string().optional(),
  location: z.string().min(3),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  status: WorkStatusEnum.default("PROPOSED"),
  sanctionDate: z.string().or(z.date()).optional(),
  expectedCompletionDate: z.string().or(z.date()).optional(),
  actualCompletionDate: z.string().or(z.date()).optional(),
  estimatedCost: z.number().positive(),
  sanctionedAmount: z.number().nonnegative(),
  releasedAmount: z.number().nonnegative(),
  spentAmount: z.number().nonnegative(),
  contractorName: z.string().optional(),
  sourceDocumentId: z.string().optional(),
  verificationStatus: VerificationStatusEnum.default("OFFICIAL_SOURCE"),
}).refine((data) => data.spentAmount <= data.releasedAmount, {
  message: "खर्च केलेली रक्कम (Spent) वितरीत रकमेपेक्षा (Released) जास्त असू शकत नाही",
  path: ["spentAmount"],
}).refine((data) => data.releasedAmount <= data.sanctionedAmount, {
  message: "वितरीत रक्कम (Released) मंजूर रकमेपेक्षा (Sanctioned) जास्त असू शकत नाही",
  path: ["releasedAmount"],
});

export const WorkUpdateSchema = z.object({
  workId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(5),
  status: WorkStatusEnum,
  eventDate: z.string().or(z.date()),
  sourceDocumentId: z.string().optional(),
  verificationStatus: VerificationStatusEnum.default("OFFICIAL_SOURCE"),
});

export const BudgetSchema = z.object({
  villageId: z.string().uuid(),
  financialYear: z.string().regex(/^\d{4}-\d{4}$/, "आर्थिक वर्ष YYYY-YYYY स्वरूपात हवे"),
  sanctionedAmount: z.number().nonnegative(),
  receivedAmount: z.number().nonnegative(),
  spentAmount: z.number().nonnegative(),
  remainingAmount: z.number().nonnegative(),
  sourceDocumentId: z.string().optional(),
  verificationStatus: VerificationStatusEnum.default("OFFICIAL_SOURCE"),
});

export const ExpenseSchema = z.object({
  budgetId: z.string().uuid(),
  category: z.string(),
  description: z.string().min(3),
  amount: z.number().positive(),
  expenseDate: z.string().or(z.date()),
  sourceDocumentId: z.string().optional(),
  verificationStatus: VerificationStatusEnum.default("OFFICIAL_SOURCE"),
});

export const FacilitySchema = z.object({
  villageId: z.string().uuid(),
  name: z.string().min(3),
  nameMr: z.string().optional(),
  category: z.string(),
  address: z.string().min(5),
  publicPhone: z.string().optional(),
  openingHours: z.string().optional(),
  services: z.array(z.string()).default([]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  verificationStatus: VerificationStatusEnum.default("OFFICIAL_SOURCE"),
});

export const SchemeSchema = z.object({
  name: z.string().min(3),
  nameMr: z.string().min(3),
  nameHi: z.string().optional(),
  category: z.string(),
  description: z.string().min(10),
  eligibility: z.string().min(5),
  benefits: z.string().min(5),
  requiredDocuments: z.array(z.string()).default([]),
  applicationProcess: z.string().min(10),
  officialUrl: z.string().url("वैध सरकारी URL आवश्यक आहे"),
  department: z.string().min(2),
  deadline: z.string().optional(),
  verificationStatus: VerificationStatusEnum.default("OFFICIAL_SOURCE"),
});

export const ComplaintSchema = z.object({
  villageId: z.string(),
  category: z.string().min(2, "तक्रार प्रकार निवडा"),
  description: z.string().min(10, "तक्रारीचे सविस्तर वर्णन किमान १० अक्षरे असावे"),
  location: z.string().min(3, "गावातील नेमके ठिकाण नमूद करा"),
  photoUrl: z.string().optional(),
  attachmentName: z.string().optional(),
  attachmentType: z.string().optional(),
  attachmentSize: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  citizenName: z.string().optional(),
  citizenPhone: z.string().regex(/^[6-9]\d{9}$/, "वैध १० अंकी मोबाईल क्रमांक टाका").optional().or(z.literal("")),
});

export const QuestionSchema = z.object({
  villageId: z.string(),
  question: z.string().min(10, "विचारलेला प्रश्न किमान १० अक्षरांचा असावा"),
  category: z.string().min(2, "प्रकार निवडा"),
  supportingDocumentId: z.string().optional(),
  citizenName: z.string().optional(),
});

export const CommunitySubmissionSchema = z.object({
  villageId: z.string(),
  type: z.enum(["MISSING_FACILITY", "MISSING_WORK", "CORRECTION", "PUBLIC_DOC"]),
  title: z.string().min(5),
  description: z.string().min(10),
  evidenceUrl: z.string().optional(),
});

export const AIQuerySchema = z.object({
  villageId: z.string(),
  question: z.string().min(2, "प्रश्न प्रविष्ट करा"),
  language: z.enum(["mr", "hi", "en"]).default("mr"),
});
