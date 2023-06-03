// import { Kafka } from "kafkajs";
// // import productsConsumer from "./consumer/productsConsumer";

// /**
//  * Initialize all consumers
//  */
// export const initConsumers = async (kafkaInstance: Kafka) => {
//   // @ts-ignore
//   const productsCnn = await kafkaInstance.consumerConnection(kafkaInstance, "products");

//   // @ts-ignore
//   const productsCnnReindex = await kafkaInstance.consumerConnection(
//     kafkaInstance,
//     "products_reindex",
//   );
//   // await productsConsumer(productsCnn, productsCnnReindex);
// };

// export default { initConsumers };
