// import { Consumer } from "kafkajs";
// import { init as InitLogger, Logger } from "app/logger";
// import { init as InitproductUseCase, productUseCase } from "usecase/product";

// import {
//   PRODUCTS_CREATED,
//   PRODUCTS_ACKNOWLEDGE_CREATED,
//   PRODUCTS_REINDEX,
// } from "delivery/worker/kafka/topics";

// /**
//  * Consumer User actions
//  * @param consumer kafka Connection
//  */
// export class PRODUCTSConsumer {
//   private consumerCnn: Consumer;
//   private consumerReindex: Consumer;
//   private productUseCase: productUseCase;
//   private log: Logger;

//   constructor({
//     consumerCnn,
//     consumerReindex,
//     productUseCase,
//     log,
//   }: {
//     consumerCnn: Consumer;
//     consumerReindex: Consumer;
//     productUseCase: productUseCase;
//     log: Logger;
//   }) {
//     this.consumerCnn = consumerCnn;
//     this.consumerReindex = consumerReindex;
//     this.productUseCase = productUseCase;
//     this.log = log;
//   }

//   public subscribe = async () => {
//     try {
//       await this.consumerCnn.subscribe({ topic: PRODUCTS_CREATED as string });
//       await this.consumerCnn.subscribe({ topic: PRODUCTS_ACKNOWLEDGE_CREATED as string });

//       await this.consumerCnn.run({
//         eachMessage: async ({ message }) => {
//           try {
//             await this.productUseCase.indexproductElastic(
//               JSON.parse(message?.value?.toString() as string),
//             );
//           } catch (error) {
//             this.log.error(error);
//           }
//         },
//       });
//     } catch (error) {
//       this.log.error(error);
//     }
//   };

//   public reindexSubscribe = async () => {
//     try {
//       await this.consumerReindex.subscribe({ topic: PRODUCTS_REINDEX as string });

//       await this.consumerReindex.run({
//         eachMessage: async ({ message }) => {
//           try {
//             await this.productUseCase.reindex(JSON.parse(message?.value?.toString() as string));
//           } catch (error) {
//             this.log.error(error);
//           }
//         },
//       });
//     } catch (error) {
//       this.log.error(error);
//     }
//   };
// }

// /**
//  * Auto creator for dependency injection
//  * @returns
//  */
// export const init = async (consumerCnn: Consumer, consumerReindex: Consumer) => {
//   const log = InitLogger();
//   const productUseCase = InitproductUseCase();
//   const PRODUCTSConsumer = new PRODUCTSConsumer({
//     consumerCnn,
//     consumerReindex,
//     productUseCase,
//     log,
//   });
//   await PRODUCTSConsumer.subscribe();
//   await PRODUCTSConsumer.reindexSubscribe();
// };

// export default init;
