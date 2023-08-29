export const dataSchema = {
    type: 'object',
    properties: {
        indexName: { type: 'string' },
        properties: {
            type: 'object',
            properties: {
                apiKey: { type: 'string' },
                env: { type: 'string' },
                accountName: { type: 'string' },
                fetchFromPIM: { type: 'boolean' },
                llmConfig: {
                    type: 'object',
                    properties: {
                        embeddingModel: {
                            type: 'object',
                            properties: {
                                isAzureOpenAI: { type: 'boolean' },
                                model: { type: 'string' },
                                'api-version': { type: 'string' },
                            },
                            required: ['isAzureOpenAI', 'model', 'api-version'],
                        },
                        consolidatedQueryModel: {
                            type: 'object',
                            properties: {
                                isAzureOpenAI: { type: 'boolean' },
                                model: { type: 'string' },
                                'api-version': { type: 'string' },
                                temperature: { type: 'number' },
                            },
                            required: ['isAzureOpenAI', 'model', 'api-version', 'temperature'],
                        },
                        finetunedModel: {
                            type: 'object',
                            properties: {
                                url: { type: 'string' },
                                apiKey: { type: 'string' },
                                isAzureOpenAI: { type: 'boolean' },
                                model: { type: 'string' },
                                temperature: { type: 'number' },
                                'api-version': { type: 'string' },
                            },
                            required: [
                                'url',
                                'apiKey',
                                'isAzureOpenAI',
                                'model',
                                'temperature',
                                'api-version',
                            ],
                        },
                        followupModel: {
                            type: 'object',
                            properties: {
                                isAzureOpenAI: { type: 'boolean' },
                                model: { type: 'string' },
                                'api-version': { type: 'string' },
                                temperature: { type: 'number' },
                            },
                            required: ['isAzureOpenAI', 'model', 'api-version', 'temperature'],
                        },
                        presentationModel: {
                            type: 'object',
                            properties: {
                                isAzureOpenAI: { type: 'boolean' },
                                model: { type: 'string' },
                                'api-version': { type: 'string' },
                                temperature: { type: 'number' },
                            },
                            required: ['isAzureOpenAI', 'model', 'api-version', 'temperature'],
                        },
                        retryPresentationModel: {
                            type: 'object',
                            properties: {
                                url: { type: 'string' },
                                apiKey: { type: 'string' },
                                isAzureOpenAI: { type: 'boolean' },
                                model: { type: 'string' },
                                'api-version': { type: 'string' },
                                temperature: { type: 'number' },
                            },
                            required: [
                                'url',
                                'apiKey',
                                'isAzureOpenAI',
                                'model',
                                'api-version',
                                'temperature',
                            ],
                        },
                    },
                    required: [
                        'embeddingModel',
                        'consolidatedQueryModel'
                    ],
                },
                topK: { type: 'number' },
                vectorSearchIgnorableKeys: {
                    type: 'array',
                    items: { type: 'string' },
                },
                namespaces: {
                    type: 'array',
                    items: { type: 'string' },
                },
            },
            required: [
                'apiKey',
                'env',
                'accountName',
                'fetchFromPIM',
                'llmConfig',
                'topK',
                'namespaces',
            ],
        },
        prompts: {
            type: 'object',
            properties: {
                CX_INIT_PROMPT: { type: 'string' },
                CONSOLIDATE_QUERY_PROMPT: { type: 'string' },
                SKU_SPECIFIC_PROMPT: { type: 'string' },
                FOLLOW_UP_QUERY_PROMPT: { type: 'string' },
            },
            required: [
                'CX_INIT_PROMPT',
                'CONSOLIDATE_QUERY_PROMPT',
            ],
        },
    },
    required: ['indexName', 'properties', 'prompts'],
};


export const sampleJsonData = {
    indexName: 'pinecone index name',
    properties: {
        apiKey: 'your pinecone api key',
        env: 'pinecone environment - Example (us-east-1-aws)',
        accountName: ' pinecone account name',
        fetchFromPIM: true,
        llmConfig: {
            embeddingModel: {
                isAzureOpenAI: true,
                model: ' embedding model name',
                'api-version':
                    'embedding model version - Example (2023-03-15-preview)',
            },
            consolidatedQueryModel: {
                isAzureOpenAI: true,
                model: 'consolidatedQueryModel name',
                'api-version':
                    'conslatedQueryModel version - Example (2023-03-15-preview)',
                temperature: 0.4,
            },
            finetunedModel: {
                url: 'finetune API endpoint',
                apiKey: 'finetune model API key',
                isAzureOpenAI: true,
                model: 'finetune model name',
                temperature: 0.4,
                'api-version':
                    'finetune model version - Example (2023-03-15-preview)',
            },
            followupModel: {
                isAzureOpenAI: true,
                model: 'followup model name',
                'api-version': 'followup api version',
                temperature: 0.4,
            },
            presentationModel: {
                isAzureOpenAI: true,
                model: 'presentation model name',
                'api-version': 'presentation api version',
                temperature: 0.4,
            },
            retryPresentationModel: {
                url: 'retry presentation API endpoint',
                apiKey: 'retry presentation API key',
                isAzureOpenAI: true,
                model: 'retry presentation model name',
                'api-version': 'retry presentation model version',
                temperature: 0.3,
            },
        },
        topK: 7,
        vectorSearchIgnorableKeys: ['key 1', 'key 2'],
        namespaces: ['namespace 1', 'namespace 2', 'namespace 3'],
    },
    prompts: {
        CX_INIT_PROMPT: 'write your init prompt here',
        CONSOLIDATE_QUERY_PROMPT: 'write your consolidation prompt here',
        SKU_SPECIFIC_PROMPT: 'write your sku specific prompt here (optional)',
        FOLLOW_UP_QUERY_PROMPT: 'write your follow up prompt here (optional)',
    },
}