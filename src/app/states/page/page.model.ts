export interface Page {
  id: string;
  name?: string;
  url: string;
  tab: string; //The referenced tab id, there is currently no check that tab exists
  x: number; //the x axis of tab table
  y: number;//the y axis of tab table
}
