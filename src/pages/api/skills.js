import db from '../../db'; // Import your database connection

// Example to fetch skills
const getSkills = async () => {
    const skills = await db.any('SELECT * FROM skills');
    return skills;
};

// Example to add a new skill
const addSkill = async (skill) => {
    await db.none('INSERT INTO skills(skill_name, skill_category, skill_image) VALUES($1, $2, $3)', [skill.name, skill.category, skill.image]);
};

// Exporting the handler function
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const skills = await getSkills();
            res.status(200).json(skills); // Return the skills as JSON
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    } else if (req.method === 'POST') {
        const { name, category, image } = req.body;
        try {
            await addSkill({ name, category, image });
            res.status(201).json({ message: 'Skill added successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to add skill' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
