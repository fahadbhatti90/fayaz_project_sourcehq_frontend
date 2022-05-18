
import React, { Component } from "react";

export function checkPermission(permission_array, find_id) {
    // 
    const permission = Object.values(permission_array).find((item, key) => key === find_id);
    if (permission !== undefined) {
        return true
    } else {
        return false
    }
    
   
}