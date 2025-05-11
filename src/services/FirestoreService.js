
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const COLLECTION_SERVICES = 'services';

export const FirestoreService = {
  // Create a new service
  createService: async (serviceData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_SERVICES), serviceData);
      return { id: docRef.id, ...serviceData };
    } catch (error) {
      console.error("Error creating service: ", error);
      throw error;
    }
  },

  // Update service by id
  updateService: async (id, serviceData) => {
    try {
      const serviceRef = doc(db, COLLECTION_SERVICES, id);
      await updateDoc(serviceRef, serviceData);
      return { id, ...serviceData };
    } catch (error) {
      console.error("Error updating service: ", error);
      throw error;
    }
  },

  // Delete service by id
  deleteService: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION_SERVICES, id));
      return id;
    } catch (error) {
      console.error("Error deleting service: ", error);
      throw error;
    }
  },

  // Get service by id
  getService: async (id) => {
    try {
      const serviceDoc = await getDoc(doc(db, COLLECTION_SERVICES, id));
      if (serviceDoc.exists()) {
        return { id: serviceDoc.id, ...serviceDoc.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting service: ", error);
      throw error;
    }
  },

  // Get services by status with realtime updates
  listenToServicesByStatus: (status, callback) => {
    try {
      const q = query(collection(db, COLLECTION_SERVICES), where("status", "==", status));
      return onSnapshot(q, (snapshot) => {
        const services = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(services);
      });
    } catch (error) {
      console.error("Error setting up services listener: ", error);
      throw error;
    }
  },

  // Generate initial mock data for Firestore
  seedInitialData: async () => {
    try {
      const services = [
        {
          type: 'Service Umum',
          vehicle: {
            plate: 'B 1234 XYZ',
            model: 'Honda Beat',
            type: 'Motor'
          },
          customer: {
            name: 'Ahmad Santoso',
            phone: '081234567890'
          },
          estimate: {
            duration: '45 menit',
            completionTime: '10:45 WIB'
          },
          status: 'waiting',
          createdAt: new Date()
        },
        {
          type: 'Cuci Steam',
          vehicle: {
            plate: 'AD 3344 HIJ',
            model: 'Honda PCX',
            type: 'Motor'
          },
          customer: {
            name: 'Budi Pratama',
            phone: '081298765432'
          },
          estimate: {
            duration: '30 menit',
            completionTime: '11:00 WIB'
          },
          status: 'in-progress',
          createdAt: new Date()
        },
        {
          type: 'Ganti Oli',
          vehicle: {
            plate: 'B 2345 STU',
            model: 'Yamaha Lexi',
            type: 'Motor'
          },
          customer: {
            name: 'Charlie Wijaya',
            phone: '087812345678'
          },
          estimate: {
            duration: '20 menit',
            completionTime: '10:30 WIB'
          },
          status: 'waiting',
          createdAt: new Date()
        },
        {
          type: 'Service Berat',
          vehicle: {
            plate: 'B 7788 JKL',
            model: 'Honda Vario',
            type: 'Motor'
          },
          customer: {
            name: 'Diana Putri',
            phone: '089987654321'
          },
          estimate: {
            duration: '120 menit',
            completionTime: '12:30 WIB'
          },
          status: 'completed',
          createdAt: new Date()
        }
      ];

      // Check if data already exists
      const snapshot = await getDocs(collection(db, COLLECTION_SERVICES));
      if (snapshot.empty) {
        const batch = [];
        for (const service of services) {
          batch.push(addDoc(collection(db, COLLECTION_SERVICES), service));
        }
        await Promise.all(batch);
        console.log("Initial data seeded successfully");
      }
    } catch (error) {
      console.error("Error seeding initial data: ", error);
    }
  }
};
