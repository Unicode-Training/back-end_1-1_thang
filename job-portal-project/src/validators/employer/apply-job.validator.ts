import z from "zod";
const allowedNote = ['INTERVIEW', 'SELECTED', 'REJECTED', 'CANCEL'];
export const updateApplyJobStatusSchema = z.object({
    applyUrl: z.url({ error: "ApplyUrl is URL format" }).optional(),
    status: z.enum(['REVIEW', 'INTERVIEW', 'SELECTED', 'REJECTED'], 'Status only: REVIEW, INTERVIEW, SELECTED, REJECTED'),
    note: z.string({ error: "Note is string" }).optional(),
    interviewDate: z.iso.datetime({ error: 'interviewDate invalid. Ex: 2020-01-01T06:15:00Z' }).transform(val => new Date(val)).optional(),
    selectedDate: z.iso.date({ error: "selectedDate invalid. Ex: 2020-01-01" }).transform(val => new Date(val)).optional(),
    invitation: z.string({ error: 'Invitation is string' }).optional()
}).refine(({ status, note }) => {
    if (!allowedNote.includes(status) && note) {
        return false;
    }
    return true;
}, {
    message: "Note only status: " + allowedNote.join(', '),
    path: ['note']
}).refine(({ status, interviewDate }) => {
    if (interviewDate && status !== 'INTERVIEW') {
        return false;
    }
    return true;
}, {
    message: 'Interview date only status: INTERVIEW',
    path: ["interviewDate"]
}).superRefine(({ status, selectedDate, invitation }, ctx) => {
    if (selectedDate && status !== 'SELECTED') {
        ctx.addIssue({
            path: ['selectedDate'],
            message: 'selectedDate only status: SELECTED',
            code: 'custom'
        })
    }

    if (invitation && status !== 'SELECTED') {
        ctx.addIssue({
            path: ['invitation'],
            message: 'invitation only status: SELECTED',
            code: 'custom'
        })
    }

});

/*
{
    message: 'selectedDate or invitation only status: SELECTED',
    path: ['selectedDate', 'invitation']
}
*/