import { ValueObject } from 'domains/core/entity/value-object';
import type { UserPreference } from 'domains/entities/users.preference/type';

class UserPreferenceValueObject extends ValueObject<UserPreference> {
    static factory(preference: UserPreference): UserPreferenceValueObject {
        return new UserPreferenceValueObject(preference);
    }

    static get community() {
        return [
            'Any',
            'Gujarati',
            'Jatt',
            'Punjabi',
            'Sunni',
            'Shia',
            'Brahmin',
            'Hindi Speaking',
            'Sindhi',
            'Bengali',
            'Tamil',
            'Telugu',
            'Malayali',
            'Maharashtrian',
            'Kannada',
            'Urdu',
            'Kashmiri',
            'Rajasthani',
            'Other',
            'No Community'
        ];
    }

    static get education() {
        return [
            'Any',
            'Doctorate',
            'Masters',
            'Bachelors',
            'Associates',
            'Trade School',
            'High School',
            'No Education'
        ];
    }

    static get gender() {
        return [
            'Men',
            'Women',
            'Everyone'
        ];
    }

    static get occupation() {
        return [
            'Any',
            'Account Executive',
            'Accountant',
            'Actor',
            'Aerospace Engineer',
            'Agriculturist',
            'Analyst',
            'Anesthesiologist',
            'Anthropologist',
            'Archaeologist',
            'Architect',
            'Artist',
            'Attorney',
            'Aviation Professional',
            'Beautician',
            'Biologist',
            'Biomedical Engineer',
            'Business Owner',
            'Chef',
            'Chemist',
            'Civil Engineer',
            'Computer Engineer',
            'Consultant',
            'Corporate Professional',
            'Cosmologist',
            'Counselor',
            'Customer Success',
            'Dancer',
            'Dentist',
            'Designer',
            'Dietitian',
            'DJ',
            'Ecologist',
            'Electrical Engineer',
            'Engineer',
            'Entrepreneur',
            'Finance Professional',
            'Flight Attendant',
            'Food Scientist',
            'Government Official',
            'Healthcare Professional',
            'Home Services Professional',
            'Hospitality Professional',
            'HR Professional',
            'Industrial Engineer',
            'Influencer',
            'Intern',
            'Lab Technician',
            'Law Enforcement',
            'Marketing Professional',
            'Mechanical Engineer',
            'Media Professional',
            'Meteorologist',
            'Military',
            'Model',
            'Musician',
            'Non-profit',
            'Nurse',
            'Occupational Therapist',
            'Optometrist',
            'Other Professional',
            'Paralegal',
            'Paramedic',
            'Pediatrician',
            'Petroleum Engineer',
            'Pharmacist',
            'Physical Therapist',
            'Physician',
            'Physicist',
            'Politician',
            'Professor',
            'Prosecutor',
            'Psychiatrist',
            'Recruiter',
            'Researcher',
            'Sales Professional',
            'Scientist',
            'Singer',
            'Software Engineer',
            'Student',
            'Stylist',
            'Surgeon',
            'Systems Engineer',
            'Teacher',
            'Tech Professional',
            'Technician',
            'Therapist',
            'Transportation',
            'Veterinarian',
            'Writer'
        ];
    }

    static get raisedIn() {
        return [
            'Any',
            'United States',
            'Canada',
            'United Kingdom',
            'Australia',
            'India',
            'Other'
        ];
    }

    static get religion() {
        return [
            'Any',
            'Sikh',
            'Hindu',
            'Islam',
            'Jain',
            'Christian',
            'Buddhist',
            'Spiritual',
            'Other',
            'No Religion'
        ];
    }
}

export { UserPreferenceValueObject };
