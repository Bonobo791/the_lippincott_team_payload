import type { Block } from 'payload'

export const AgentGrid: Block = {
  slug: 'agentGrid',
  interfaceName: 'AgentGridBlock',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our Agents' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'agents',
      type: 'relationship',
      relationTo: 'agents',
      hasMany: true,
      admin: {
        description: 'Leave empty to show all agents (sorted by their Order field)',
      },
    },
  ],
}
