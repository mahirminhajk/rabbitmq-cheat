import { Client } from "@elastic/elasticsearch";

class ElasticSearchService {
    private client: Client;

    // private isInitialized = false;

    constructor() {
        this.client = new Client({ 
            node: process.env.ELASTICSEARCH_URL,
            auth:{
                username: process.env.ELASTICSEARCH_USERNAME!,
                password: process.env.ELASTICSEARCH_PASSWORD!
            }
        });
        console.log('🔍 ElasticSearch client created');
    };

    // async init() {
    //     if (await this.client.indices.exists({ index: 'orders' })) {
    //         console.log('🔍 Orders index already exists');
    //         this.isInitialized = true;
    //         return;
    //     }
    //     await this.client.indices.create({
    //         index: 'orders',
    //         body: {
    //             mappings: {
    //                 properties: {
    //                     id: { type: 'keyword' },
    //                     name: { type: 'text' },
    //                     price: { type: 'integer' }
    //                 }
    //             }
    //         }
    //     });
    //     this.isInitialized = true;
    //     console.log('🔍 Orders index created');
    // }

    async indexOrder(order: { id: string, name: string, price: number }) { 
        // if(!this.isInitialized) this.init();
        await this.client.index({
            index: 'orders',
            id: order.id,
            body: order
        });
        console.log(`📋 Order ${order.id} indexed`);
    };

    async searchOrder(query: string) {
        // if (!this.isInitialized) this.init();
        const result = await this.client.search({
            index: 'orders',
            body: {
                query: {
                    match: {
                        name: query
                    }
                }
            }
        });
        console.log(`🔍 Found ${result.hits.hits} orders`);
        return result.hits.hits;
    };

};

// export const elasticSearchService = new ElasticSearchService();