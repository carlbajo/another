import z from "zod";
import { isMatch, isEmpty } from "@/lib/helper";

export const PasswordforgotSchema = z.object({
    email: z.string().email("Email is invalid!").superRefine((email, ctx) => {
        if(!email.endsWith("@cdd.edu.ph")){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Email must end with @cdd.edu.ph!"
            });
        }
    }),
});

export const PasswordresetSchema = z.object({
    token: z.string({invalid_type_error: "Token format is invalid"}),
    password: z.string().min(8, "Password is short!").max(20, "Password is too long!"),
    confirmPassword: z.string(),
}).superRefine((token, ctx) => {
    if(!isMatch(token.password, token.confirmPassword)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match!",
        });
    }
});

export const SigninSchema = z.object({
    email: z.string().email("The email is invalid!"),
    password: z.string(),
}).superRefine((login, ctx) => {
    if(isEmpty(login.email)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is empty!"
        });
    }
    if(isEmpty(login.password)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password is empty!"
        });
    }
});

export const SignupSchema = z.object({
    email: z.string().email("Email is invalid!").min(8),
    password: z.string().min(8, "Password is short!").max(20, "Password is too long!"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is short!").max(40, "First name is too long!"),
    lastName: z.string().min(1, "Last name is too short!").max(40, "Last name is too large!"),
    courseId: z.string(),
}).superRefine((register, ctx) => {
    if(!register.email.endsWith("@cdd.edu.ph")){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email must end with @cdd.edu.ph!",
        });
    }
    if(!isMatch(register.password, register.confirmPassword)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match!",
        });
    }
});

export const VerifyemailSchema = z.object({
    email: z.string(),
    token: z.string({
        invalid_type_error: "Token format is invalid!"
    }),
});

export const UpdateSchema = z.object({
    email: z.string({message: "Email is required!"}).email("Email is invalid!").min(8),
    password: z.optional(z.string()),
    confirmPassword: z.optional(z.string()),
    privacy: z.string(),
    courseId: z.string(),
    affiliationId: z.optional(z.string()),
}).superRefine((register, ctx) => {
    if(!register.email.endsWith("@cdd.edu.ph")){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email must end with @cdd.edu.ph!",
        });
    }
    if(!isMatch(register.password!, register.confirmPassword!)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password do not match!",
        });
    }
});

// Achivevements
export const AddAchievementSchema = z.object({
    name: z.string().min(2, "Achievement name is too short!").max(100, "Achievement name is too long!"),
    dateAchieved: z.string().date("Date achieved is required!").superRefine((dateAchieved, ctx) => {
        if(isEmpty(dateAchieved)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateAchieved) => {
        return new Date(dateAchieved);
    }),
    userId: z.string(),
    description: z.string().min(1, "Description is too short!").max(200, "Biography is too long!").nullable().optional(),
});

export const UpdateAchievementSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Achievement name is too short!").max(100, "Achievement name is too long!"),
    dateAchieved: z.string().date("Date achieved is required!").superRefine((dateAchieved, ctx) => {
        if(isEmpty(dateAchieved)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateAchieved) => {
        return new Date(dateAchieved);
    }),
    userId: z.string(),
    description: z.string().min(1, "Biography is too short!").max(200, "Biography is too long!").nullable().optional(),
});

export const DeleteAchievementSchema = z.object({
    id: z.string({"message" : "Invalid format!"}),
    userId: z.string({"message" : "Invalid format!"}),
});

// Education
export const AddEducationSchema = z.object({
    schoolName: z.string().min(3, "School name is short!"),
    dateStarted: z.string().date("Date started is required!").superRefine((dateStarted, ctx) => {
    if(isEmpty(dateStarted)){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date started is required!"
        });
    }
    }).transform((dateStarted) => {
        return new Date(dateStarted);
    }),
    dateEnded: z.string().transform((dateEnded) => {
        if (dateEnded.length === 0) {
            return null;
        }
        try {
            return new Date(dateEnded);
            } catch (error) {
            return null;
            }      
    }).optional().nullable(),
    userId: z.string(),
    });

export const UpdateEducationSchema = z.object({
    id: z.string(),
    schoolName: z.string().min(3, "School name is short!"),
    dateStarted: z.string().date("Date started is required!").superRefine((dateStarted, ctx) => {
        if(isEmpty(dateStarted)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateStarted) => {
        return new Date(dateStarted);
    }),
    dateEnded: z.string().transform((dateEnded) => {
        if (dateEnded.length === 0) {
            return null;
        }
        try {
            return new Date(dateEnded);
          } catch (error) {
            return null;
          }      
    }).optional().nullable(),
    userId: z.string(),
});

export const DeleteEducationSchema = z.object({
    id: z.string({"message" : "Invalid format!"}),
    userId: z.string({"message" : "Invalid format!"}),
});
// Project
export const AddProjectSchema = z.object({
    name: z.string({message: "Project name is required!"}).min(2, "Project name is too short!").max(100, "Project name is too long!"),
    dateCompleted: z.string().date("Date completed is required!").superRefine((dateCompleted, ctx) => {
        if(isEmpty(dateCompleted)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date completed is required!"
            });
        }
    }).transform((dateCompleted) => {
        return new Date(dateCompleted);
    }),
    userId: z.string(),
    description: z.string({message: "Description is required!"}).min(1, "Description is too short!").max(200, "Biography is too long!").nullable().optional(),
});

export const UpdateProjectSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Project name is too short!").max(100, "Project name is too long!"),
    dateCompleted: z.string().date("Date completed is required!").superRefine((dateCompleted, ctx) => {
        if(isEmpty(dateCompleted)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Date started is required!"
            });
        }
    }).transform((dateCompleted) => {
        return new Date(dateCompleted);
    }),
    userId: z.string(),
    description: z.string().min(1, "Biography is too short!").max(200, "Biography is too long!").nullable().optional(),
});

export const DeleteProjectSchema = z.object({
    id: z.string({"message" : "Invalid format!"}),
    userId: z.string({"message" : "Invalid format!"}),
});

export const UpdateUser = z.object({
    id: z.string(),
    firstName: z.string({message: "First name is invalid!"}).min(2, "First  name is too short!").max(50, "First name is too long!"),
    lastName: z.string({message: "Last name is invalid!"}).min(2, "Last  name is too short!").max(50, "Last name is too long!"),
    middleName: z.string().transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
    birthdate: z.string().transform((value) => {
        if (value.length === 0) {
            return null;
        }
        try {
            return new Date(value);
        } catch (error) {
            return null;
        }      
    }).optional().nullable(),
    personalEmail: z.string().email("Email is invalid!").transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
    phoneNumber: z.string().transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
    city: z.string().transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
    country: z.string().transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
    province: z.string().transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
    bio: z.string().transform((value) => {
        if(value.trim().length === 0) return null
        return value;
    }).optional().nullable(),
});


export const SkillSchema = z.object({
    userId: z.string(),
    skillId: z.string(),
});