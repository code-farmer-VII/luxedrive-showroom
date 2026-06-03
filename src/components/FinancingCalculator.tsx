/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Landmark, ArrowUpRight, CheckCircle2, BadgeAlert } from "lucide-react";

interface FinancingCalculatorProps {
  vehiclePrice?: number;
  vehicleModel?: string;
}

export default function FinancingCalculator({ vehiclePrice = 680000, vehicleModel = "Lamborghini Revuelto" }: FinancingCalculatorProps) {
  const [price, setPrice] = useState(vehiclePrice);
  const [downPercent, setDownPercent] = useState(20); // 20% down
  const [interestRate, setInterestRate] = useState(5.75); // 5.75% ARR typical private bank
  const [periodMonths, setPeriodMonths] = useState(60); // 5 years
  const [balloonPercent, setBalloonPercent] = useState(15); // 15% balloon payment
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Sync if vehiclePrice changes
  useEffect(() => {
    if (vehiclePrice) {
      setPrice(vehiclePrice);
    }
  }, [vehiclePrice]);

  useEffect(() => {
    const principal = price * (1 - downPercent / 100);
    const balloonAmount = price * (balloonPercent / 100);
    
    // Monthly interest calculation
    const r = (interestRate / 100) / 12;
    const n = periodMonths;

    let monthly = 0;
    if (r === 0) {
      monthly = (principal - balloonAmount) / n;
    } else {
      // Amortization with balloon payment factor
      const df = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      monthly = (principal - (balloonAmount / Math.pow(1 + r, n))) / df;
    }

    setMonthlyPayment(Math.max(0, parseFloat(monthly.toFixed(2))));
    
    const downAmount = price * (downPercent / 100);
    const calculatedTotal = downAmount + (monthly * n) + balloonAmount;
    setTotalCost(Math.max(0, parseFloat(calculatedTotal.toFixed(2))));
  }, [price, downPercent, interestRate, periodMonths, balloonPercent]);

  const currencyFormat = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="financing-calculator-container" className="bg-[#0F0F0F] border border-gray-800 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-6">
      
      {/* Decorative luxury gold glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="border-b border-gray-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <Landmark className="h-4 w-4 text-[#D4AF37]" />
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">BESPOKE FINANCING PORTAL</span>
        </div>
        <h3 className="font-sans text-xl font-semibold text-white">Private Jet & Automotive Capital Planner</h3>
        <p className="text-xs text-gray-400 mt-1">
          Simulate high-asset portfolio-backed flexible financing schemes for the <strong className="text-gray-200">{vehicleModel}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Input form */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* Asset price */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span>Asset Valuation Price</span>
              <span className="text-white font-semibold">{currencyFormat(price)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="25000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#D4AF37] bg-gray-800 h-1 rounded-lg cursor-pointer"
            />
          </div>

          {/* Downpayment percent */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span>Initial Down Payment ({downPercent}%)</span>
              <span className="text-white font-semibold">{currencyFormat(price * (downPercent / 100))}</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full accent-[#D4AF37] bg-gray-800 h-1 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest rate */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span>Annual Percentage Rate (APR)</span>
              <span className="text-white font-semibold">{interestRate.toFixed(2)} %</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#D4AF37] bg-gray-800 h-1 rounded-lg cursor-pointer"
            />
          </div>

          {/* Period Months */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-gray-400">Amortization Period (Months)</span>
            <div className="grid grid-cols-4 gap-2">
              {[24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPeriodMonths(m)}
                  className={`border font-mono text-xs rounded-md py-2 transition ${
                    periodMonths === m 
                      ? "border-[#D4AF37] bg-[#D4AF37]/5 text-white" 
                      : "border-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-900"
                  }`}
                >
                  {m} m ({m/12} Years)
                </button>
              ))}
            </div>
          </div>

          {/* Balloon payment percent */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span>Balloon Final Recourse ({balloonPercent}%)</span>
              <span className="text-white font-semibold">{currencyFormat(price * (balloonPercent / 100))}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={balloonPercent}
              onChange={(e) => setBalloonPercent(Number(e.target.value))}
              className="w-full accent-[#D4AF37] bg-gray-800 h-1 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Dynamic calculation results */}
        <div className="lg:col-span-5 flex flex-col h-full justify-between gap-6 bg-gray-900/40 border border-gray-800/80 p-5 rounded-xl">
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">ESTIMATED EXPENDITURE SHEET</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-sans font-bold text-white tracking-tight">{currencyFormat(monthlyPayment)}</span>
              <span className="text-xs font-mono text-gray-500">/ Month</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Approximate monthly repayment program based on customized sovereign portfolio support.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 border-t border-b border-gray-800/50 py-4 font-mono text-xs">
            <div className="flex justify-between items-center text-gray-400">
              <span>Downpayment Amount</span>
              <span className="text-white">{currencyFormat(price * (downPercent / 100))}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Financed Principal</span>
              <span className="text-white">{currencyFormat(price * (1 - downPercent / 100))}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Balloon Settlement Amount</span>
              <span className="text-white">{currencyFormat(price * (balloonPercent / 100))}</span>
            </div>
            <div className="flex justify-between items-center text-[#D4AF37] pt-2 border-t border-gray-800/40 font-semibold mb-0.5">
              <span>Total Capital Outlay</span>
              <span>{currencyFormat(totalCost)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[10px] font-mono text-yellow-500/90 leading-relaxed">
              <BadgeAlert className="h-4 w-4 shrink-0 text-yellow-500" />
              <span>Quotes subject to physical address audit and dynamic rating scores.</span>
            </div>
            <button
              onClick={() => alert(`Pre-approval registered! A custom credit line of ${currencyFormat(price - (price * (downPercent / 100)))} has been pre-scheduled for your profile.`)}
              className="w-full bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-semibold text-xs uppercase px-4 py-3 rounded-lg transition-colors duration-200 tracking-wider flex items-center justify-center gap-1.5"
            >
              <span>Instant Capital Pre-Approve</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
