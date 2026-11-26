'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, PencilLine, ShoppingCart } from 'lucide-react'
import { useDealerPortal, type DealerProfile } from '@/components/dealer-portal-context'

const editableFields: { key: keyof DealerProfile; label: string; autoComplete: string; type?: 'tel' }[] = [
  { key: 'ownerName', label: 'Owner name', autoComplete: 'name' },
  { key: 'mobile', label: 'Mobile number', autoComplete: 'tel', type: 'tel' },
  { key: 'alternatePhone', label: 'Alternate phone', autoComplete: 'tel', type: 'tel' },
  { key: 'address', label: 'Address', autoComplete: 'street-address' },
  { key: 'city', label: 'City', autoComplete: 'address-level2' },
  { key: 'state', label: 'State', autoComplete: 'address-level1' },
  { key: 'pinCode', label: 'PIN code', autoComplete: 'postal-code' },
]

export function DealerProfilePage() {
  const { profile, updateProfile, uniqueProducts, totalQuantity, categoryCount, categorySummary, cartProducts } = useDealerPortal()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<DealerProfile>(profile)
  const [notice, setNotice] = useState('')
  const initials = profile.ownerName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  function startEditing() {
    setDraft(profile)
    setEditing(true)
    setNotice('')
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateProfile(draft)
    setEditing(false)
    setNotice('Your profile changes have been saved for this browser session.')
  }

  function cancelEditing() {
    setDraft(profile)
    setEditing(false)
    setNotice('')
  }

  return <div className="portal-page">
    <section className="portal-page-heading">
      <div><p className="eyebrow">YOUR PARTNER ACCOUNT</p><h1>My Profile.</h1><p>Account details and your current My Cart activity.</p></div>
      {!editing && <button className="portal-action-link portal-action-button" type="button" onClick={startEditing}><PencilLine size={15}/> Edit Profile</button>}
    </section>
    {notice && <p className="portal-feedback" role="status">{notice}</p>}

    <section className="portal-profile-hero">
      <span className="portal-profile-avatar">{initials}</span><div className="portal-profile-identity"><p className="eyebrow">{profile.businessName}</p><h2>{profile.ownerName}</h2><span>Dealer ID {profile.dealerId}</span></div>
      <span className="portal-approval-badge"><i/> {profile.approvalStatus}</span>
      <div className="portal-registration"><span>REGISTERED</span><strong>{profile.registeredAt}</strong></div>
    </section>

    {editing ? <form className="portal-profile-edit portal-panel" onSubmit={saveProfile}>
      <div className="portal-panel-heading"><div><p className="eyebrow">CONTACT &amp; ADDRESS</p><h2>Edit profile details</h2></div></div>
      <div className="portal-profile-form-grid">{editableFields.map(({ key, label, autoComplete, type }) => <label className={key === 'address' ? 'portal-field portal-field-wide' : 'portal-field'} key={key}>{label}<input type={type ?? 'text'} autoComplete={autoComplete} required={key !== 'alternatePhone'} value={draft[key]} onChange={(event) => { const value = event.currentTarget.value; setDraft((current) => ({ ...current, [key]: value })) }}/></label>)}</div>
      <div className="portal-form-actions"><button className="portal-submit-button" type="submit">Save changes <ArrowRight size={15}/></button><button className="portal-cancel-button" type="button" onClick={cancelEditing}>Cancel</button></div>
      <p className="portal-form-note">Dealer ID, approval status, business verification, email and business type are managed by RK Tiles &amp; Sanitary.</p>
    </form> : <div className="portal-profile-grid">
      <section className="portal-panel"><div className="portal-panel-heading"><div><p className="eyebrow">CONTACT &amp; BUSINESS</p><h2>Business information</h2></div></div><dl className="portal-detail-list">
        <div><dt>Business name</dt><dd>{profile.businessName}</dd></div><div><dt>Dealer ID</dt><dd>{profile.dealerId}</dd></div><div><dt>Owner name</dt><dd>{profile.ownerName}</dd></div><div><dt>Registered email</dt><dd>{profile.email}</dd></div><div><dt>Mobile number</dt><dd>{profile.mobile}</dd></div>{profile.alternatePhone && <div><dt>Alternate phone</dt><dd>{profile.alternatePhone}</dd></div>}<div><dt>Business type</dt><dd>{profile.businessType}</dd></div>{profile.gstNumber && <div><dt>GST number</dt><dd>{profile.gstNumber}</dd></div>}
      </dl></section>
      <section className="portal-panel"><div className="portal-panel-heading"><div><p className="eyebrow">REGISTERED LOCATION</p><h2>Address</h2></div></div><address className="portal-address">{profile.address}<br/>{profile.city}, {profile.state} {profile.pinCode}<br/>{profile.country}</address><div className="portal-address-id"><span>ACCOUNT STATUS</span><strong>{profile.approvalStatus}</strong><span>BUSINESS VERIFICATION</span><strong>{profile.verificationStatus}</strong></div></section>
    </div>}

    <section className="portal-panel portal-profile-activity">
      <div className="portal-panel-heading"><div><p className="eyebrow">SHOPPING ACTIVITY</p><h2>My Cart activity</h2></div><Link className="portal-text-link" href="/dealer/my-cart">View My Cart <ArrowUpRight size={14}/></Link></div>
      <div className="portal-activity-metrics"><div><strong>{uniqueProducts}</strong><span>unique products</span></div><div><strong>{totalQuantity}</strong><span>total quantity selected</span></div><div><strong>{categoryCount}</strong><span>categories</span></div></div>
      <div className="portal-activity-grid">
        <div><h3>Category-wise products</h3>{categorySummary.length ? <ul className="portal-category-list">{categorySummary.map((category) => <li key={category.tag}><span>{category.name}</span><strong>{category.productCount} {category.productCount === 1 ? 'product' : 'products'} · {category.totalQuantity} qty</strong></li>)}</ul> : <p className="portal-muted-copy">No product categories selected yet.</p>}</div>
        <div><h3>Products in My Cart</h3>{cartProducts.length ? <ul className="portal-profile-cart-list">{cartProducts.map(({ product, quantity }) => <li key={product.slug}><span className="portal-thumb"><Image src={product.image} alt="" fill sizes="48px"/></span><span><strong>{product.name}</strong><small>{product.code} · {product.category}</small></span><b>× {quantity}</b></li>)}</ul> : <div className="portal-cart-empty-inline"><ShoppingCart size={18}/><span>My Cart is empty.</span><Link href="/dealer/catalogue">Browse catalogue <ArrowRight size={13}/></Link></div>}</div>
      </div>
    </section>
  </div>
}
