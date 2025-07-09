"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Division {
  id: string;
  name: string;
  bn_name: string;
}

interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
}

interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}

interface Union {
  id: string;
  upazila_id: string;
  name: string;
  bn_name: string;
}

export default function AddressForm() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedUnion, setSelectedUnion] = useState<string>("");

  useEffect(() => {
    // Load divisions
    fetch("/data/bd-divisions.json")
      .then((res) => res.json())
      .then((data) => {
        // The divisions data is in the third object of the array
        const divisionsData = data[2].data || [];
        setDivisions(divisionsData);
      })
      .catch((error) => {
        console.error("Error loading divisions:", error);
        setDivisions([]);
      });
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      // Load districts for selected division
      fetch("/data/bd-districts.json")
        .then((res) => res.json())
        .then((data) => {
          // The districts data is in the third object of the array
          const districtsData = data[2].data || [];
          const filteredDistricts = districtsData.filter(
            (district: District) => district.division_id === selectedDivision,
          );
          setDistricts(filteredDistricts);
        })
        .catch((error) => {
          console.error("Error loading districts:", error);
          setDistricts([]);
        });
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedUnion("");
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      // Load upazilas for selected district
      fetch("/data/bd-upazilas.json")
        .then((res) => res.json())
        .then((data) => {
          // The upazilas data is in the third object of the array
          const upazilasData = data[2].data || [];
          const filteredUpazilas = upazilasData.filter(
            (upazila: Upazila) => upazila.district_id === selectedDistrict,
          );
          setUpazilas(filteredUpazilas);
        })
        .catch((error) => {
          console.error("Error loading upazilas:", error);
          setUpazilas([]);
        });
    } else {
      setUpazilas([]);
    }
    setSelectedUpazila("");
    setSelectedUnion("");
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedUpazila) {
      // Load unions for selected upazila
      fetch("/data/bd-unions.json")
        .then((res) => res.json())
        .then((data) => {
          // The unions data is in the third object of the array
          const unionsData = data[2].data || [];
          const filteredUnions = unionsData.filter(
            (union: Union) => union.upazila_id === selectedUpazila,
          );
          setUnions(filteredUnions);
        })
        .catch((error) => {
          console.error("Error loading unions:", error);
          setUnions([]);
        });
    } else {
      setUnions([]);
    }
    setSelectedUnion("");
  }, [selectedUpazila]);

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Division</label>
        <Select value={selectedDivision} onValueChange={setSelectedDivision}>
          <SelectTrigger>
            <SelectValue placeholder="Select Division" />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division.id} value={division.id}>
                {division.name} ({division.bn_name})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">District</label>
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger>
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.id} value={district.id}>
                {district.name} ({district.bn_name})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Upazila</label>
        <Select value={selectedUpazila} onValueChange={setSelectedUpazila}>
          <SelectTrigger>
            <SelectValue placeholder="Select Upazila" />
          </SelectTrigger>
          <SelectContent>
            {upazilas.map((upazila) => (
              <SelectItem key={upazila.id} value={upazila.id}>
                {upazila.name} ({upazila.bn_name})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Union</label>
        <Select value={selectedUnion} onValueChange={setSelectedUnion}>
          <SelectTrigger>
            <SelectValue placeholder="Select Union" />
          </SelectTrigger>
          <SelectContent>
            {unions.map((union) => (
              <SelectItem key={union.id} value={union.id}>
                {union.name} ({union.bn_name})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
